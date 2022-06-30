class ReservationComponent {
    constructor() {
        this.showId = null;
        this.seatsId = [];
        this.clientName = null;
        this.clientEmail = null;
        this.clientPhone = null;
    }

    setShowId(showId) {
        this.showId = showId;
    }

    setSeatsId(seatsId) {
        this.seatsId = seatsId;
    }

    setClientName(name) {
        this.clientName = name;
    }

    setClientEmail(email) {
        this.clientEmail = email;
    }

    setClientPhone(phone) {
        this.clientPhone = phone;
    }

    async createPreReservation() {
        return new Promise((res, rej) => {
            Utils.makeAjaxCall({
                method: 'POST',
                url: '/api/pre-reservacion',
                body: {
                    showId: this.showId,
                    seatsId: this.seatsId,
                    clientName: this.clientName,
                    clientEmail: this.clientEmail,
                    clientPhone: this.clientPhone,
                },
                callback: (responsePayload) => {
                    return res(responsePayload);
                },
            });
        });
    }
}
