const EMOJIS = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭", "🍍"];


/**
 * 
 * @param {strings[]} items - Абстрактные данные для перемешивания
 * @returns {strings[]} - Перемешанный массив с данными
 */
function shuffleAndPickRandom(items) {
    if(items && Array.isArray(items)) {
        // Сортировка исходного массива в случайном порядке
        const sortedArr = items.sort(() => Math.random(items) - 0.5);

        // Достаем из 10 элементов первые 8
        const dublicateArr = [...sortedArr].slice(0, 8);

        // Дублируем первые 8 элементов
        const doubleArr = [...dublicateArr, ...dublicateArr];

        // Сортируем дублированный массив
        const sortedDoubleArr = doubleArr.sort(() => Math.random(doubleArr) - 0.5);

        return sortedDoubleArr;
    } else {
        throw new Error("Передайте эмодзи в виде массива!")
    }
}

shuffleAndPickRandom(EMOJIS)

/**
 * Переворачивает карту и обрабатывает ход игрока
 * @param {HTMLDivElement} card - Отдельно взятая карточка
 */
const flipCard = (card) => {

}
/**
 * Состояние игры
 * @property {boolean} isGameStarted - Игра началась или нет.
 * @property {number} totalTime - Общее время в игре.
 * @property {number} flippedCards - Количество перевернутых карточек.
 * @property {number} totalFlips - Общее количество перевернутых карточек.
 */
const STATE = {
	isGameStarted: false,
	totalTime: 0,
	flippedCards: 0,
	totalFlips: 0,
};

/**
 * Контролы игры
 * @property {HTMLDivElement} boardContainer - Контейнер игрового поля.
 * @property {HTMLDivElement} board - Основное содержимое поля.
 * @property {HTMLDivElement} moves - Контрол для учета шагов.
 * @property {HTMLDivElement} timer - Контрол для учета времени.
 * @property {HTMLButtonElement} start - Кнопка для старта игры.
 */
const SELECTORS = {
	boardContainer: document.querySelector(".board-container"),
	board: document.querySelector(".board"),
	moves: document.querySelector(".moves"),
	timer: document.querySelector(".timer"),
	start: document.querySelector("button"),
};

/**
 *
 */
const generateGame = () => {
	const dimensions = SELECTORS.board.dataset.dimension;

	if (dimensions % 2 !== 0) {
		throw new Error("Размер игрового поля должен быть четным");
	}

    // Вызываем ф-цию перемешивания и получения случайной карточки для emoji
    const shuffleEmoji = shuffleAndPickRandom(EMOJIS)

	// Итерация по карточкам
	const cardsHTML = shuffleEmoji.map((emoji) => {
		return `
                            <div class="card">
                                <div class="card-front"></div>
                                <div class="card-back">${emoji}</div>
                            </div>
                        `;
	}).join("");

	SELECTORS.board.insertAdjacentHTML("beforeend", cardsHTML);
};

/**
 * Функция обработки событий (клик по карточке)
 */
const attachEventListeners = () => {
    // Обработчик события клика по карточке ( Need to fix )
    const cardsFront = SELECTORS.board.children.children(0);

    // Получение (card) родителя карточки
    const cardsCollection = SELECTORS.board.children;

    if (cardsCollection) {
        // HtmlCollection в массив
        [...cardsCollection].forEach((card) => {
            // Добавление элемента на отдельно взятую карточку
            card.addEventListener("click", (event) => {
                const eventTarget = event.target;
                const eventParent = eventTarget.parentElement;

                if(eventParent.classList.contains("card") &&
                eventParent.className.includes("flipped")) 
                {
                    flipCard(eventParent)
                }
            });
        });
    }
};

/* Вызов необходимых функций при загрузке страницы */
document.addEventListener("DOMContentLoaded", () => {
    generateGame(); // Генерируем игру
    attachEventListeners() // Прикрепляем обработчик событий
})
