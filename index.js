class Model {
    constructor(view, container) {
        this.view = view;
        this.counter = 0;
        this.container = document.getElementById(container);
        this.getData();
    }
    getData() {
        this.counter += 1;
        let that = this;
        fetch(`https://rickandmortyapi.com/api/character/?page=${that.counter}`)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            that.renderCards(data.results);
        })
        .catch((err) => console.error(err));
    }
    getDataAboutCharacter(id) {
        let that = this;
        let page = Math.ceil(id / 20);
        if (page > 42) {
            page = 1;
        }
        fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            while (id > 20) {
                id -= 20;
            }
            that.renderModal(data.results[id - 1], id);
        })
        .catch((err) => console.error(err));
    }
    renderCards(data) {
        for (let i = 0; i < data.length; i++) {
            this.view.renderCards(data[i].name, data[i].image, data[i].id);
        }
    }
    renderModal(info, id) {
        let ep = null;
        this.view.load();
        fetch(`${info.episode[0]}`)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            let obj = data;
            ep = obj.id;
        })
        .catch((err) => console.error(err));
        setTimeout(() => {
            this.view.renderModal(info, ep);
        }, 1000);
    }
    closeModal() {
        this.view.closeModal();
    }
}

class View {
    constructor(container) {
        this.container = document.getElementById(container);
    }
    renderCards(name, avatar, id) {
        const figure = document.createElement("figure");
        figure.classList.add("card");
        figure.id = id;
        this.container.append(figure);
        const image = document.createElement("img");
        image.classList.add("card__avatar");
        image.src = avatar;
        figure.append(image);
        const caption = document.createElement("figcaption");
        caption.classList.add("card__caption");
        caption.textContent = name;
        figure.append(caption);
    }
    load() {
        const overlay = document.getElementById("overlay");
        overlay.classList.add("open");
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        const container = document.querySelector(".load");
        svg.setAttributeNS(null, "width", "90");
        svg.setAttributeNS(null, "height", "50");
        container.append(svg);
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttributeNS(null, "cx", "12");
        circle.setAttributeNS(null, "cy", "30");
        circle.setAttributeNS(null, "r", "12");
        circle.setAttributeNS(null, "fill", "rgb(165, 220, 230)");
        svg.append(circle);
        let animate = document.createElementNS(svgNS, "animate");
        animate.setAttributeNS(null, "attributeName", "opacity");
        animate.setAttributeNS(null, "attributeType", "XML");
        animate.setAttributeNS(null, "dur", "1s");
        animate.setAttributeNS(null, "values", "0;1;0");
        animate.setAttributeNS(null, "repeatCount", "indefinite");
        animate.setAttributeNS(null, "begin", "0.1");
        circle.append(animate);
        const secondCircle = document.createElementNS(svgNS, "circle");
        secondCircle.setAttributeNS(null, "cx", "44");
        secondCircle.setAttributeNS(null, "cy", "30");
        secondCircle.setAttributeNS(null, "r", "12");
        secondCircle.setAttributeNS(null, "fill", "rgb(165, 220, 230)");
        svg.append(secondCircle);
        let secondAnimate = document.createElementNS(svgNS, "animate");
        secondAnimate.setAttributeNS(null, "attributeName", "opacity");
        secondAnimate.setAttributeNS(null, "attributeType", "XML");
        secondAnimate.setAttributeNS(null, "dur", "1s");
        secondAnimate.setAttributeNS(null, "values", "0;1;0");
        secondAnimate.setAttributeNS(null, "repeatCount", "indefinite");
        secondAnimate.setAttributeNS(null, "begin", "0.2");
        secondCircle.append(secondAnimate);
        const thirdCircle = document.createElementNS(svgNS, "circle");
        thirdCircle.setAttributeNS(null, "cx", "76");
        thirdCircle.setAttributeNS(null, "cy", "30");
        thirdCircle.setAttributeNS(null, "r", "12");
        thirdCircle.setAttributeNS(null, "fill", "rgb(165, 220, 230)");
        svg.append(thirdCircle);
        let thirdAnimate = document.createElementNS(svgNS, "animate");
        thirdAnimate.setAttributeNS(null, "attributeName", "opacity");
        thirdAnimate.setAttributeNS(null, "attributeType", "XML");
        thirdAnimate.setAttributeNS(null, "dur", "1s");
        thirdAnimate.setAttributeNS(null, "values", "0;1;0");
        thirdAnimate.setAttributeNS(null, "repeatCount", "indefinite");
        thirdAnimate.setAttributeNS(null, "begin", "0.3");
        thirdCircle.append(thirdAnimate);
        setTimeout(() => {
            container.removeChild(svg);
        }, 1000);
    }
    renderModal(data, ep) {
        const modal = document.getElementById("modal");
        modal.classList.add("open");
        const name = document.getElementById("name");
        name.textContent = data.name;
        const origin = document.getElementById("origin");
        origin.textContent = data.origin.name;
        const status = document.getElementById("status");
        status.textContent = data.status;
        const location = document.getElementById("location");
        location.textContent = data.location.name;
        const species = document.getElementById("species");
        species.textContent = data.species;
        const gender = document.getElementById("gender");
        gender.textContent = data.gender;
        const type = document.getElementById("type");
        if (data.type == "") {
            data.type = "-";
        }
        type.textContent = data.type;
        const episode = document.getElementById("episode");
        episode.textContent = ep;
        const avatar = document.getElementById("avatar");
        avatar.style.cssText = `background-image: url(${data.image}), linear-gradient(90deg, rgba(255, 255, 255, 0) 38%, rgb(255, 255, 255));`;

    }
    closeModal() {
        const overlay = document.getElementById("overlay");
        overlay.classList.remove("open");
        const modal = document.getElementById("modal");
        modal.classList.remove("open");
    }
}


class Controller {
    constructor(model) {
        this.model = model;
        this.addListeners();
    }
    addListeners() {
        document.addEventListener("click", (event) => {
            if (event.target.closest(".card")) {
                let id = event.target.closest(".card").id;
                this.model.getDataAboutCharacter(id);
            }
        })
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("modal-overlay")) {
                this.model.closeModal();
            }
        })
        document.addEventListener("scroll", (event) => {
            if (window.innerHeight + window.pageYOffset >= container.offsetHeight) {
                this.model.getData();
            }
        })
    }
}

const myView = new View("container");
const myModel = new Model(myView, "container");
const myController = new Controller(myModel);
