console.log('Se llamo al script');
let reservationComponent = null;

document.addEventListener('DOMContentLoaded', () => {
    Utils.addScript(
        {
            id: 'reservation-component-script',
            src: '/scripts/components/reservation.component.js',
        },
        onLoadScript,
    );
});

async function onLoadScript() {
    console.log('se cargo el script');
    reservationComponent = new ReservationComponent();

    const submitbutton = document.getElementById('reservation-submit-input');
    submitbutton.onclick = reserve;

    const urlElement = document.getElementById('paymentUrl');
    console.log(urlElement);
}

async function reserve() {
    const showInput = document.getElementById('show-selected');
    // const showId = showInput.value;
    // console.log(showId);

    const seatsIdInput = document.getElementById('seats-input');
    // const seatsIdString = seatsIdInput.value;
    // console.log(seatsIdString);

    const nameInput = document.getElementById('name-input');
    // console.log(nameInput.value);
    const emailInput = document.getElementById('email-input');
    // console.log(emailInput.value);
    const phoneInput = document.getElementById('phone-input');
    // console.log(phoneInput.value);

    reservationComponent.setShowId(Number(showInput.value));
    reservationComponent.setSeatsId(
        seatsIdInput.value.split(' ').map((number) => Number(number)),
    );
    reservationComponent.setClientName(nameInput.value);
    reservationComponent.setClientEmail(emailInput.value);
    reservationComponent.setClientPhone(phoneInput.value);

    const response = await reservationComponent.createPreReservation();
    console.log(response.mercadoPagoPreference.preference.sandbox_init_point);

    const urlElement = document.getElementById('paymentUrl');
    urlElement.href =
        response.mercadoPagoPreference.preference.sandbox_init_point;
    urlElement.style.display = 'block';
}
