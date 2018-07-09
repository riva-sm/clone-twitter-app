$(document).ready(function(){

// выводим текущую дату месяца
			var getDate = function() {
					var d = new Date(),
									hrs = d.getHours(),
									min = d.getMinutes(),
									day = d.getDate(),
									month = d.getMonth(),
									year = d.getFullYear();

					var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");

					// var actualDate = day + ' ' + monthArray[month] + ' ' + year + ' года' + hrs + ' часов' + min + ' минут'; 
					var actualDate = `${day} ${monthArray[month]} ${year} года ${hrs} часов ${min} минут `;
					return actualDate;
			}
// счетчик твиттов
			var countTweets = function(){
							var tweetCounter = $('.tweet-card').length;
							$('#tweetsCounter').text(tweetCounter);
			}
				// https://gist.github.com/ryansmith94/0fb9f6042c1e0af0d74f
			 var wrapURLs = function (text, new_window) {
					    var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
					    var target = (new_window === true || new_window == null) ? '_blank' : '';
    return text.replace(url_pattern, function (url) {
      var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
      var href = protocol_pattern.test(url) ? url : 'http://' + url;
      return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
    });
};

			// создаём функцию публикации твита

				var createTweet = function(date, text) {

							var $tweetBox = $('<div class="card tweet-card">'); // создаём обертку для твита
							var $tweetDate = $('<div class="tweet-date">').text( date ); // создаём дату
							var $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>'); // создаём контент с твитом

							var additionalClassName;

							if ( text.length < 100 ) {
										additionalClassName = 'font-size-large';
							} else if ( text.length > 150 ) {
										additionalClassName = 'font-size-small';
							} else {
										additionalClassName = 'font-size-normal';
							}

							$tweetText.addClass(additionalClassName);

							$tweetBox.append($tweetDate).append($tweetText); // Получаем готовый твит с датой и текстом
							$('#tweetList').prepend($tweetBox);
							countTweets(); 
				}
			

		// создание базы твиттов
		var tweetsBase = [ 
						{
								date: '28 апр. 2018 г.',
								text: 'Изучаю laravel. Первый проект ToDolist.'
						},
						{
									date: '22 апр. 2018 г.',
									text: 'Создание игры Космические Рейнджеры. Игра полностью написана на движке MVC (Модель, объект, контроллер), JavaScript. Аналог игры морской бой.'
						},
						{
									date: '16 апр. 2018 г.',
									text: 'Стартует курс webcademy, обучение веб-разработке.'
						},
						{
									date: '28 март. 2018 г.',
									text: 'Прокрастинация и методы борьбы с ней. Автор блога Wait But Why Тим Урбан в трёх материалах описал прокрастинацию в разные периоды жизни и предложил способы борьбы с ней. https://vc.ru/24818-why-procrastinators-procrastinate'
						},
						{
									date: '20 март. 2018 г.',
									text: 'Microsoft рассказала об оптимизации выпуска обновлений Windows 10 при помощи ИИ'
						}
		];

		tweetsBase.forEach(function(tweet){
							// console.log(tweet);
							createTweet(tweet.date, tweet.text);
		});

			
	// Форма отправки твита
		$('#postNewTweet').on('submit', function(e){
						e.preventDefault(); // отменяем отправку формы
						var tweetText = $('#tweetText').val(); // получаем текст твита = привет мир
						createTweet( getDate(), tweetText);
						$('#tweetText').val('');

			});

});