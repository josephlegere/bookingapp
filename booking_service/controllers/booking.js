const Booking = require('../models/Booking');

//  @desc   Get all bookings
//  @route  GET /api/v1/booking
//  @access Public
exports.getBookings = async (req, res) => {
    try {

        let { type, id } = req.params;
        let query = { active: true };

        if (type === 'buyer')
            query['buyer.id'] = id;
        else if (type === 'seller')
            query['seller.id'] = id;
        
        console.log(query);

        const bookings = await Booking.find(query).sort({ 'slot': 1 });

        return res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

//  @desc   Add booking
//  @route  POST /api/v1/booking/add
//  @access Public
exports.addBooking = async (req, res) => {
    try {
        //timeslots are per hour for each buyer, e.g. user 1 => 7:00 AM slot, user 2 => 8:00 AM slot
        const { buyer, seller, slot } = req.body;

        const booking = await Booking.create({ buyer, seller, slot });
        console.log('Booking Created!');

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

//  @desc   Update booking
//  @route  PUT /api/v1/booking/confirm or /api/v1/booking/reject
//  @access Public
exports.verifyBooking = async (req, res) => {

    let { id, list } = req.body;
    let path = req.route.path.replace(/[^a-zA-Z ]/g, '');

    console.log(req.body);
    console.log(path);

    try {

        let action = {};
        
        if (path === 'confirm') action.confirmed = true;
        else if (path === 'reject') action.active = false;
        
        // let bulkOp = Booking.collection.initializeUnorderedBulkOp();
        
        // list.forEach(elem => {
        //     console.log(elem);
        //     bulkOp.find({
        //         _id: elem.id
        //     }).updateOne({
        //         $set: action
        //     });
        // });

        // bulkOp.find({ _id: list[0].id }).updateOne(
        //     [
        //         { $set: { confirmed: true } }
        //     ]
        // );
        
        // await bulkOp.execute();
        let book_pendings = list.map(elem => {
            return elem.id;
        });

        console.log(book_pendings);

        await Booking.updateMany(
            { _id: { $in: book_pendings }},
            { $set: action }
        );
        // console.log(bulkOp);

        return res.status(200).json({
            success: true,
            //count: parts.length,
            // data: _document_info.source
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            error: err
        });
    }
}