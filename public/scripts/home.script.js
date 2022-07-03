document.addEventListener('DOMContentLoaded', () => {
    Utils.addScript(
        {
            id: 'carousel-component-script',
            src: './scripts/components/carousel/carousel.component.js',
        },
        onCarouselScriptLoad,
    );

    Utils.addScript(
        {
            id: 'short-reservation-component-script',
            src: './scripts/components/shortReservation/short-reservation.component.js',
        },
        onShortReservationScriptLoad,
    );
});

function onCarouselScriptLoad() {
    const carouselId = 'carousel';
    const startCarouselAt = 1;
    const carouselComponent = new CarouselComponent(
        carouselId,
        startCarouselAt,
    );
    carouselComponent.render();
}

function onShortReservationScriptLoad() {
    const shortReservationComponent = new ShortReservationComponent();
    shortReservationComponent.render();
}
