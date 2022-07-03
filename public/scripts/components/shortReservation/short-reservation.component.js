class ShortReservationComponent {
    constructor() {}

    render() {
        Utils.addLink(
            {
                id: 'short-reservation-component-style-link',
                type: 'text/css',
                rel: 'stylesheet',
                href: './scripts/components/shortReservation/short-reservation.component.css',
            },
            this.onLoadScript.bind(this),
        );
    }

    onLoadScript() {
        console.log('Se renderizó el short reservation');
    }
}
