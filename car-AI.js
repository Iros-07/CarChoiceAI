document.getElementById("carForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // библиотеку
    let carLibrary;
    try {
        const response = await fetch("./cars.json");
        carLibrary = await response.json();
    } catch (error) {
        console.error("Ошибка загрузки JSON-файла:", error);
        document.getElementById("result").textContent = "Ошибка загрузки данных о машинах.";
        return;
    }

    // считываем значения из формы
    const formData = new FormData(event.target);
    const userCar = {
        brand: formData.get("brand"),
        color: formData.get("color"),
        body: formData.get("body"),
        fuel: formData.get("fuel"),
        transmission: formData.get("transmission"),
        steering: formData.get("steering"),
        price: parseFloat(formData.get("price")),
        year: parseInt(formData.get("year"), 10),
        engine: formData.get("engine"),
        drive: formData.get("drive")
    };

    // функция сравнения
    function compareCars(userCar, libraryCar) {
        let score = 0;

        if (userCar.brand === libraryCar.brand) score++;
        if (userCar.color === libraryCar.color) score++;
        if (userCar.body === libraryCar.body) score++;
        if (userCar.fuel === libraryCar.fuel) score++;
        if (userCar.transmission === libraryCar.transmission) score++;
        if (userCar.steering === libraryCar.steering) score++;
        if (userCar.engine === libraryCar.engine) score++;
        if (userCar.drive === libraryCar.drive) score++;

        const priceDifference = Math.abs(userCar.price - libraryCar.price) / libraryCar.price;
        if (priceDifference <= 0.2) score++;

        const yearDifference = Math.abs(userCar.year - libraryCar.year);
        if (yearDifference <= 5) score++;

        return score;
    }

    // сортировка
    let bestMatch = null;
    let highestScore = 0;

    for (const libraryCar of carLibrary) {
        const score = compareCars(userCar, libraryCar);
        if (score > highestScore) {
            highestScore = score;
            bestMatch = libraryCar;
        }
    }

    // вывод результата
    const resultDiv = document.getElementById("result");
    if (bestMatch) {
        resultDiv.innerHTML = `
            <h2>Наиболее подходящая машина:</h2>
            <p>Марка: ${bestMatch.brand}</p>
            <p>Цвет: ${bestMatch.color}</p>
            <p>Кузов: ${bestMatch.body}</p>
            <p>Тип топлива: ${bestMatch.fuel}</p>
            <p>Коробка передач: ${bestMatch.transmission}</p>
            <p>Руль: ${bestMatch.steering}</p>
            <p>Цена: ${bestMatch.price}</p>
            <p>Год: ${bestMatch.year}</p>
            <p>Объем двигателя: ${bestMatch.engine}</p>
            <p>Привод: ${bestMatch.drive}</p>
        `;

        // запрос для AI
        const prompt = `
            Марка: ${bestMatch.brand}
            Цвет: ${bestMatch.color}
            Кузов: ${bestMatch.body}
            Тип топлива: ${bestMatch.fuel}
            Коробка передач: ${bestMatch.transmission}
            Руль: ${bestMatch.steering}
            Цена: ${bestMatch.price}
            Год: ${bestMatch.year}
            Объем двигателя: ${bestMatch.engine}
            Привод: ${bestMatch.drive}

            Расскажи об этой машине, её историю, интересные факты, плюсы и минусы.
        `;

        // проверяем доступа
        try {
            await waitForModelToLoad();
            const aiResponse = await fetch("https://api-inference.huggingface.co/models/facebook/bart-base", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer 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`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: { max_new_tokens: 500 }
                })
            });

            if (!aiResponse.ok) {
                throw new Error(`Ошибка API: ${aiResponse.status} ${aiResponse.statusText}`);
            }

            const aiData = await aiResponse.json();
            document.getElementById("ai-result").textContent = aiData[0]?.generated_text || "Нет ответа от AI.";
        } catch (error) {
            console.error("Ошибка взаимодействия с AI:", error);
            document.getElementById("ai-result").textContent = "Ошибка получения данных от AI.";
        }
    } else {
        resultDiv.textContent = "Подходящая машина не найдена.";
    }
});

// загрузки модели
async function waitForModelToLoad() {
    let retries = 5;
    while (retries > 0) {
        const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-base", {
            headers: { "Authorization": `Bearer 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` }
        });
        const data = await response.json();
        if (response.ok && !data.error) {
            return;
        }
        console.log("Модель загружается, ожидание...");
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 секунд
        retries--;
    }
    throw new Error("Модель недоступна после нескольких попыток");
}
