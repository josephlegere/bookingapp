const moment = require('moment');
const Seller = require('../models/Seller');
const Booking = require('../models/Booking');

//  @desc   Get all sellers
//  @route  GET /api/v1/seller
//  @access Public
exports.getSellers = async (req, res) => {
    try {
        // After retrieving list of Sellers, retrieve Bookings,
        // then cross reference Bookings & Sellers,
        // find out available slots
        // 
        // Retrieving bookings requires a date param

        let { date } = req.query;
        console.log(date);
        
        const today = moment(date);
        console.log(today);

        const from_date = today.startOf('week').toISOString(); // Sunday
        const to_date = today.endOf('week').toISOString(); // Saturday

        console.log(from_date);
        console.log(to_date);

        const sellers = await Seller.find();
        console.log('sellers');

        const bookings = await Booking.find({
            slot: {
                $gte: from_date,
                $lt: to_date
            },
            active: true
        });
        
        let slots = generateSlots(sellers, bookings, today);

        return res.status(200).json({
            success: true,
            // count: sellers.length,
            data: {
                // sellers,
                // bookings,
                slots
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

//  @desc   Add seller
//  @route  POST /api/v1/seller/add
//  @access Public
exports.addSeller = async (req, res) => {
    try {
        const { name, contact, slots } = req.body;

        const seller = await Seller.create({ name, contact, slots });
        console.log('Seller Created!');

        return res.status(200).json({
            success: true
        });
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

function generateSlots (sellers, bookings, current) {

    let timeslots = {};

    // Object.entries(bookings).forEach((elem) => {
    //     let day = elem[0];
    //     let timestart = elem[1].start;
    //     let timeend = elem[1].end;

    //     timeslots[day] = [];
    // });

    // console.log(bookings.filter(booking => booking.seller.id == sellers[0].id));

    let current_date = current.format('YYYY-MM-DD');
    let current_time = current.format('HH:mm:ss');
    console.log(current_date);

    timeslots = sellers.reduce((accumulator, seller) => {

        let books_on_seller = bookings.filter(booking => booking.seller.id == seller.id);
        // console.log(books_on_seller);

        accumulator[seller.name] = {};

        accumulator[seller.name].id = seller.id;
        accumulator[seller.name].slots = seller.slots.map(elem => {
            let { day, start, end } = elem;
            console.log(moment().day(day).format('YYYY-MM-DD'));
            console.log(moment().day(day).isBefore(current_date));

            // if (moment().day(day).isBefore(current_date))
            //     break;

            let _slot = {
                day,
                timings: []
            };
            // console.log(_slot);
            
            let today = moment().format('YYYY-MM-DD');
            let _slot_start = moment(`${today} ${start}`);
            let _slot_end = moment(`${today} ${start}`).add(1, 'hours');
            
            do {
                let vacant = true;

                // check if there's any vacancy
                vacant = !(books_on_seller.some(booking => {
                    return (day === moment(booking.slot).format('dddd')) && (_slot_start.format('HH:mm:ss') === moment(booking.slot).format('HH:mm:ss'));
                }));

                _slot.timings.push({ start: _slot_start.format('HH:mm:ss'), end: _slot_end.format('HH:mm:ss'), vacant });
                _slot_start = _slot_start.add(1, 'hours');
                _slot_end = _slot_end.add(1, 'hours')
            } while (_slot_end.isSameOrBefore(moment(`${today} ${end}`)));

            // console.log(_slot);

            return _slot;
        });

        return accumulator;
    }, {});

    // console.log(timeslots);

    return timeslots;
}