const pageFlip = new St.PageFlip(
    document.querySelector(".flipbook"),
    {
        width: 450,
        height: 600,

        size: "fixed",

        showCover: true,

        mobileScrollSupport: false,

        maxShadowOpacity: 0.5,

        flippingTime: 1000,

        useMouseEvents: true
    }
);

pageFlip.loadFromHTML(
    document.querySelectorAll(".page")
);