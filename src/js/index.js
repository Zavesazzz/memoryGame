const EMOJIS = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭", "🍍"];


/**
 * 
 * @param {strings[]} items - Абстрактные данные для перемешивания
 * @returns {strings[]} - Перемешанный массив с данными
 */
function shuffleAndPickRandom(items) {
	// Сортировка исходного массива в случайном порядке
	const sortedArr = items.sort(() => Math.random(items) - 0.5);

	// Достаем из 10 элементов первые 8
	const duplicateArr = Math.random([...sortedArr].slice(0, 8));

	// Дублируем первые 8 элементов
	const doubleArr = [...duplicateArr, ...duplicateArr];

	// Сортируем дублированный массив
	const sortedDoubleArr = doubleArr.sort(() => Math.random(doubleArr) - 0.5);

	return sortedDoubleArr;
}

shuffleAndSort(EMOJIS)

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

	// Итерация по карточкам
	const cardsHTML = EMOJIS.map((emoji) => {
		return `
                            <div class="card">
                                <div class="card-front"></div>
                                <div class="card-back">${emoji}</div>
                            </div>
                        `;
	}).join("");

	SELECTORS.board.insertAdjacentHTML("beforeend", cardsHTML);
};

generateGame();

// Обработчик события клика по карточке
const CARDS = SELECTORS.board.children;

if (CARDS) {
	// HtmlCollection в массив
	[...CARDS].forEach((card) => {
		// Добавление элемента на отдельно взятую карточку
		card.addEventListener("click", (event) => {});
	});
}
