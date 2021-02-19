import moment from 'moment';
import _ from 'lodash';

export const state = () => ({
    list: []
});

export const actions = {
    async get ({ commit }, { seller }) {
        console.log(seller);
        let { id } = seller;

        const res = await this.$axios.get(`${process.env.BASE_URL}${process.env.BOOKING_URL}/seller/${id}`);
        let { data } = res.data;
        console.log(res.data);

		commit("setBooking", formatData(data));
    },
    async confirm ({ commit }, { seller, list }) {
        let { id } = seller;
        const response = await this.$axios.put(`${process.env.BASE_URL}${process.env.BOOKING_URL_CONFIRM}`, { id, list });

        commit("stripBooking", list);
    },
    async reject ({ commit }, { seller, list }) {
        let { id } = seller;
        const response = await this.$axios.put(`${process.env.BASE_URL}${process.env.BOOKING_URL_REJECT}`, { id, list });

        commit("stripBooking", list);
    }
}

export const mutations = {
    setBooking: (state, attendance) => (state.list = attendance),

    // clears/strips out data on checkerlist not needed anymore
    stripBooking: (state, attendance) => (state.list = _.difference(state.list, attendance))
};

function formatData (list) {
    return list.map((elem) => {

        let { _id, buyer, confirmed, slot } = elem;

        return { id: _id, date: moment(slot).format('YYYY-MM-DD'), buyer: buyer.name, confirmed, slot: moment(slot).format('HH:mm:SS'), status: confirmed };
    });
}