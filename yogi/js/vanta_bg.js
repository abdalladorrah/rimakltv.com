window.addEventListener('DOMContentLoaded', () => {
    if (window.VANTA) {
        window.VANTA.FOG({
            el: "body",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0x8b5cf6, // Violet 500
            midtoneColor: 0xec4899,  // Pink 500
            lowlightColor: 0x020617, // Deep Base
            baseColor: 0x020617,     // Deep Base
            blurFactor: 0.6,
            speed: 1.5,
            zoom: 1.2
        })
    }
});

