function calculate() {

    const area =
        Number(document.getElementById("area").value);

    const repairType =
        Number(document.getElementById("repairType").value);

    const result =
        document.getElementById("result");

    const orderButton =
        document.getElementById("orderCalculation");


    if (!area || area <= 0) {

        result.innerHTML =
            "Введите площадь ванной комнаты.";

        orderButton.style.display = "none";

        return;
    }


    let price = 0;

    let repairName = "";


    if (repairType === 0) {

        price = area * 3500;

        repairName =
            "Только укладка плитки";

    }

    else if (repairType === 1) {

        price = area * 8500;

        repairName =
            "Капитальный ремонт";

    }

    else if (repairType === 2) {

        price = area * 12000;

        repairName =
            "Ремонт под ключ";

    }


    let additionalWorks = [];


    if (
        document.getElementById("demolition").checked
    ) {

        price += area * 1200;

        additionalWorks.push(
            "Демонтаж старой плитки"
        );

    }


    if (
        document.getElementById("walls").checked
    ) {

        price += area * 1800;

        additionalWorks.push(
            "Выравнивание стен"
        );

    }


    if (
        document.getElementById("waterproofing").checked
    ) {

        price += area * 1000;

        additionalWorks.push(
            "Гидроизоляция"
        );

    }


    if (
        document.getElementById("floor").checked
    ) {

        price += area * 2500;

        additionalWorks.push(
            "Тёплый пол"
        );

    }


    if (
        document.getElementById("plumbing").checked
    ) {

        price += 15000;

        additionalWorks.push(
            "Монтаж сантехники"
        );

    }


    if (
        document.getElementById("grout").checked
    ) {

        price += area * 500;

        additionalWorks.push(
            "Затирка швов"
        );

    }


    result.innerHTML =
        "Предварительная стоимость: " +
        price.toLocaleString("ru-RU") +
        " ₽" +
        "<br><small>" +
        "Точная стоимость определяется после осмотра объекта." +
        "</small>";


    orderButton.style.display =
        "block";


    window.calculationData = {

        area: area,

        repairName: repairName,

        additionalWorks:
            additionalWorks,

        price: price

    };

}

function sendCalculationToForm() {

    if (!window.calculationData) {

        alert(
            "Сначала выполните расчёт стоимости."
        );

        return;
    }


    const data =
        window.calculationData;


    const comment =
        document.getElementById(
            "clientComment"
        );


    let text =
        "Хочу заказать ремонт по расчёту BARAKAT STROY16.\n\n";


    text +=
        "Площадь: " +
        data.area +
        " м²\n";


    text +=
        "Тип ремонта: " +
        data.repairName +
        "\n";


    if (
        data.additionalWorks.length > 0
    ) {

        text +=
            "Дополнительные работы:\n";

        data.additionalWorks.forEach(
            function(work) {

                text +=
                    "• " +
                    work +
                    "\n";

            }
        );

    }


    text +=
        "\nПредварительная стоимость: " +
        data.price.toLocaleString("ru-RU") +
        " ₽";


    comment.value = text;


    document
        .getElementById("contacts")
        .scrollIntoView({
            behavior: "smooth"
        });

}

/* =================================
   ФОРМА ЗАЯВКИ → WHATSAPP
================================= */

const form =
    document.getElementById("contactForm");


if (form) {

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "clientName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "clientPhone"
                ).value.trim();


            const area =
                document.getElementById(
                    "clientArea"
                ).value.trim();


            const comment =
                document.getElementById(
                    "clientComment"
                ).value.trim();


            const message =
                document.getElementById(
                    "formMessage"
                );


            if (!name || !phone) {

                message.innerHTML =
                    "❗ Пожалуйста, укажите имя и телефон.";

                return;
            }


            const whatsappText =
                "Здравствуйте! Хочу заказать ремонт у BARAKAT STROY16.\n\n" +

                "👤 Имя: " +
                name +
                "\n" +

                "📞 Телефон: " +
                phone +
                "\n" +

                "📐 Площадь: " +
                (area || "не указана") +
                " м²\n\n" +

                "💬 Комментарий:\n" +
                (comment || "не указан");


            const whatsappUrl =
                "https://wa.me/79673712725?text=" +
                encodeURIComponent(
                    whatsappText
                );


            message.innerHTML =
                "💬 Открываем WhatsApp...";


            window.open(
                whatsappUrl,
                "_blank"
            );

        }
    );

}

function openImage(src) {

    const modal =
        document.getElementById("imageModal");

    const image =
        document.getElementById("modalImage");

    image.src = src;

    modal.style.display = "flex";
}


function closeImage() {

    document.getElementById(
        "imageModal"
    ).style.display = "none";
}

/* =================================
   ОТЗЫВЫ → WHATSAPP
================================= */

function openReviewForm() {

    const modal =
        document.getElementById("reviewModal");

    modal.style.display = "flex";

}


function closeReviewForm() {

    const modal =
        document.getElementById("reviewModal");

    modal.style.display = "none";

}


/* Закрытие окна при клике по затемнению */

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("reviewModal");

        if (
            event.target === modal
        ) {

            closeReviewForm();

        }

    }
);


/* Отправка отзыва */

const reviewForm =
    document.getElementById("reviewForm");


if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("reviewName")
                    .value
                    .trim();


            const rating =
                document
                    .getElementById("reviewRating")
                    .value;


            const text =
                document
                    .getElementById("reviewText")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("reviewMessage");


            if (!name || !text) {

                message.innerHTML =
                    "❗ Заполните имя и текст отзыва.";

                return;

            }


            let stars = "";

            for (
                let i = 0;
                i < Number(rating);
                i++
            ) {

                stars += "⭐";

            }


            const whatsappText =

                "Здравствуйте! Новый отзыв с сайта BARAKAT STROY16.\n\n" +

                "👤 Имя: " +
                name +
                "\n\n" +

                "⭐ Оценка: " +
                stars +
                "\n\n" +

                "💬 Отзыв:\n" +
                text;


            const whatsappUrl =

                "https://wa.me/79673712725?text=" +

                encodeURIComponent(
                    whatsappText
                );


            message.innerHTML =
                "💬 Открываем WhatsApp...";


            window.open(
                whatsappUrl,
                "_blank"
            );

        }
    );

}
/* =========================================
   КАЛЬКУЛЯТОР BARAKAT STROY16
========================================= */

let calculatorData = {
    repairClass: "",
    bathroomType: "",
    roomCondition: "",
    price: 0
};


/* =========================================
   ПЕРЕХОД НА СЛЕДУЮЩИЙ ШАГ
========================================= */

function nextCalcStep(currentStep) {

    if (currentStep === 1) {

        const selected =
            document.querySelector(
                'input[name="repairClass"]:checked'
            );

        if (!selected) {

            alert(
                "Пожалуйста, выберите класс ремонта."
            );

            return;
        }

        calculatorData.repairClass =
            selected.value;
    }


    if (currentStep === 2) {

        const selected =
            document.querySelector(
                'input[name="bathroomType"]:checked'
            );

        if (!selected) {

            alert(
                "Пожалуйста, выберите тип санузла."
            );

            return;
        }

        calculatorData.bathroomType =
            selected.value;
    }


    document
        .getElementById(
            "calcStep" + currentStep
        )
        .classList.remove("active");


    document
        .getElementById(
            "calcStep" + (currentStep + 1)
        )
        .classList.add("active");

}


/* =========================================
   НАЗАД
========================================= */

function prevCalcStep(currentStep) {

    document
        .getElementById(
            "calcStep" + currentStep
        )
        .classList.remove("active");


    document
        .getElementById(
            "calcStep" + (currentStep - 1)
        )
        .classList.add("active");

}


/* =========================================
   РАСЧЁТ И ФИНАЛЬНЫЙ ЭКРАН
========================================= */

function showCalcFinal() {

    const selected =
        document.querySelector(
            'input[name="roomCondition"]:checked'
        );


    if (!selected) {

        alert(
            "Пожалуйста, выберите состояние помещения."
        );

        return;
    }


    calculatorData.roomCondition =
        selected.value;


    /* =========================
       БАЗОВАЯ ЦЕНА
    ========================= */

    let price = 0;


    if (calculatorData.repairClass === "Эконом") {

        price = 200000;

    }


    if (calculatorData.repairClass === "Комфорт") {

        price = 220000;

    }


    /* =========================
       ТИП САНУЗЛА
    ========================= */

    if (
        calculatorData.bathroomType ===
        "Раздельный"
    ) {

        price += 30000;

    }


    if (
        calculatorData.bathroomType ===
        "Только ванная комната"
    ) {

        price -= 20000;

    }


    if (
        calculatorData.bathroomType ===
        "Только туалет"
    ) {

        price -= 80000;

    }


    /* =========================
       СОСТОЯНИЕ ПОМЕЩЕНИЯ
    ========================= */

    if (
        calculatorData.roomCondition ===
        "Вторичка"
    ) {

        price += 20000;

    }


    /*
       Новостройка = +0 ₽
       Поэтому здесь ничего
       добавлять не нужно.
    */


    calculatorData.price = price;


    /* =========================
       ПОКАЗЫВАЕМ РЕЗУЛЬТАТ
    ========================= */

    document.getElementById(
        "resultClass"
    ).textContent =
        calculatorData.repairClass;


    document.getElementById(
        "resultBathroom"
    ).textContent =
        calculatorData.bathroomType;


    document.getElementById(
        "resultCondition"
    ).textContent =
        calculatorData.roomCondition;


    document.getElementById(
        "resultPrice"
    ).textContent =
        price.toLocaleString("ru-RU") +
        " ₽";


    /* =========================
       ПЕРЕХОД НА ФИНАЛ
    ========================= */

    document
        .getElementById("calcStep3")
        .classList.remove("active");


    document
        .getElementById("calcFinal")
        .classList.add("active");

}


/* =========================================
   ОТПРАВКА РАСЧЁТА В WHATSAPP
========================================= */

const calculatorLeadForm =
    document.getElementById(
        "calculatorLeadForm"
    );


if (calculatorLeadForm) {

    calculatorLeadForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const phone =
                document
                    .getElementById(
                        "calculatorPhone"
                    )
                    .value
                    .trim();


            const messageElement =
                document.getElementById(
                    "calculatorMessage"
                );


            if (!phone) {

                messageElement.innerHTML =
                    "❗ Укажите номер телефона.";

                return;

            }


            /* =========================
               ФОРМИРУЕМ СООБЩЕНИЕ
            ========================= */

            const whatsappMessage =

                "Здравствуйте! Хочу получить точный расчёт стоимости ремонта у BARAKAT STROY16.\n\n" +

                "📊 Предварительный расчёт стоимости работ:\n\n" +

                "🔹 Класс ремонта: " +
                calculatorData.repairClass +
                "\n" +

                "🔹 Санузел: " +
                calculatorData.bathroomType +
                "\n" +

                "🔹 Состояние помещения: " +
                calculatorData.roomCondition +
                "\n\n" +

                "💰 Ориентировочная сумма работ: " +
                calculatorData.price.toLocaleString("ru-RU") +
                " ₽\n\n" +

                "📞 Телефон / WhatsApp: " +
                phone +
                "\n\n" +

                "🎁 Хочу получить подробный прайс-лист и зафиксировать скидку 10%.";


            const whatsappUrl =

                "https://wa.me/79673712725?text=" +

                encodeURIComponent(
                    whatsappMessage
                );


            messageElement.innerHTML =
                "💬 Открываем WhatsApp...";


            window.open(
                whatsappUrl,
                "_blank"
            );

        }
    );

}
