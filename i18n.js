(function () {
  'use strict';

  var norm = function (s) { return s.replace(/\s+/g, ' ').trim(); };

  // Source text (Armenian / original) -> [Russian, English]
  var D = {
    'Mika Kids Dental Clinic — մանկական ատամնաբուժարան': ['Mika Kids Dental Clinic — детская стоматология', 'Mika Kids Dental Clinic — children\'s dental clinic'],
    'Mika Kids Dental Clinic — որտեղ փայլում են փոքրիկ ժպիտները։ Մանկական ատամնաբուժություն՝ զննում, մաքրում, պլոմբավորում, օրթոդոնտիա և շտապ օգնություն։': ['Mika Kids Dental Clinic — где сияют маленькие улыбки. Детская стоматология: осмотр, чистка, пломбирование, ортодонтия и неотложная помощь.', 'Mika Kids Dental Clinic — where little smiles shine. Pediatric dentistry: check-ups, cleaning, fillings, orthodontics and emergency care.'],
    'Որտեղ փայլում են փոքրիկ ժպիտները': ['Где сияют маленькие улыбки', 'Where little smiles shine'],

    'Անցնել բովանդակությանը': ['Перейти к содержимому', 'Skip to content'],
    'Լեզու': ['Язык', 'Language'],
    'Մենյու': ['Меню', 'Menu'],
    'Հիմնական': ['Основное', 'Main'],
    'Ստորին': ['Нижнее меню', 'Footer'],
    'Զանգահարել': ['Позвонить', 'Call'],

    'Մենք': ['Наша команда', 'Our team'],
    'Ծառայություններ': ['Услуги', 'Services'],
    'Կարծիքներ': ['Отзывы', 'Reviews'],
    'Սոցցանցեր': ['Соцсети', 'Social media'],
    'Հարց ու պատասխան': ['Вопросы и ответы', 'Questions & answers'],
    'Գրանցվել': ['Записаться', 'Book a visit'],

    'Որտեղ փայլում են փոքրիկ': ['Где сияют маленькие', 'Where little'],
    'ժպիտները': ['улыбки', 'smiles shine'],
    'Mika-ի բժիշկները երեխաների հետ': ['Врачи Mika с детьми', 'Mika doctors with children'],

    '★ 5.0 Google-ում · 703 կարծիք': ['★ 5.0 на Google · 703 отзыва', '★ 5.0 on Google · 703 reviews'],
    '5.0 Google-ում · 703 կարծիք': ['5.0 на Google · 703 отзыва', '5.0 on Google · 703 reviews'],
    '2026 թ. հոկտեմբերի 20-ի դրությամբ': ['по состоянию на 20 октября 2026', 'as of Oct 20, 2026'],

    'Մեր ծառայությունները': ['Наши услуги', 'Our services'],
    'Mika Kids Dental Clinic-ում յուրաքանչյուր': ['В Mika Kids Dental Clinic каждый', 'At Mika Kids Dental Clinic every'],
    'այց նախատեսված է հատուկ երեխաների համար': ['визит создан специально для детей', 'visit is designed especially for children'],

    'Զննում և մաքրում': ['Осмотр и чистка', 'Check-ups and cleaning'],
    'Կանոնավոր զննումներ և քարերի մաքրում': ['Регулярные осмотры и удаление зубного камня', 'Regular check-ups and tartar removal'],
    'Ֆտորացում և հերմետիզացիա': ['Фторирование и герметизация', 'Fluoride and sealants'],
    'Պաշտպանություն վաղ կարիեսից': ['Защита от раннего кариеса', 'Protection from early cavities'],
    'Պլոմբավորում': ['Пломбирование', 'Fillings'],
    'Հարմարավետ բուժում երեխաների համար': ['Комфортное лечение для детей', 'Comfortable treatment for children'],
    'Օրթոդոնտի խորհրդատվություն': ['Консультация ортодонта', 'Orthodontic consultation'],
    'Վաղ հսկողություն ծամածռության համար': ['Раннее наблюдение за прикусом', 'Early monitoring of bite development'],
    'Հանգստացնող բուժում': ['Лечение в спокойной обстановке', 'Calm treatment'],
    'Հանգիստ և անվտանգ բուժում մանուկներին': ['Спокойное и безопасное лечение малышей', 'Calm and safe treatment for little ones'],
    'Շտապ օգնություն': ['Неотложная помощь', 'Emergency care'],
    'Արագ օգնություն սուր ցավի դեպքում': ['Быстрая помощь при острой боли', 'Fast help for acute pain'],

    'Ահա և մենք՝ բալիկների ժպիտը հոգացող թիմը։': ['Вот и мы — команда, которая заботится об улыбках малышей.', 'Here we are, the team who cares for your little ones\' smiles.'],
    'Շուտով կհանդիպենք:': ['Скоро увидимся!', 'See you soon!'],
    'Միքայել Նիկողոսյան': ['Микаэл Никогосян', 'Mikayel Nikoghosyan'],
    'Հիմնադիր,': ['Основатель,', 'Founder,'],
    'Ատամնաբույժ': ['Стоматолог', 'Dentist'],
    'Անուն Ազգանուն': ['Имя Фамилия', 'First Last'],
    'Մանկական ատամնաբույժ': ['Детский стоматолог', 'Pediatric dentist'],

    'Ծնողները մեր մասին :)': ['Родители о нас :)', 'Parents about us :)'],
    'Նախորդ կարծիքը': ['Предыдущий отзыв', 'Previous review'],
    'Հաջորդ կարծիքը': ['Следующий отзыв', 'Next review'],
    '5 աստղ': ['5 звёзд', '5 stars'],
    'We had a very good experience with doctor Michael. He is very caring, kind, and patient with children. My two kids felt comfortable during their visits. The staff is also friendly, welcoming and helpful. Definitely recommend this clinic to other families.': ['У нас был очень хороший опыт с доктором Майклом. Он очень заботливый, добрый и терпеливый с детьми. Мои двое детей чувствовали себя комфортно во время визитов. Персонал тоже дружелюбный, приветливый и отзывчивый. Обязательно рекомендую эту клинику другим семьям.', 'We had a very good experience with doctor Michael. He is very caring, kind, and patient with children. My two kids felt comfortable during their visits. The staff is also friendly, welcoming and helpful. Definitely recommend this clinic to other families.'],
    'Կարծիքի տեքստը կլինի այստեղ։ Ծնողը պատմում է, թե ինչպես անցավ երեխայի առաջին այցը, ինչպես էր իրեն զգում փոքրիկը և ինչու խորհուրդ կտա կլինիկան ընկերներին։': ['Текст отзыва будет здесь. Родитель рассказывает, как прошёл первый визит ребёнка, как чувствовал себя малыш и почему порекомендует клинику друзьям.', 'The review text will be here. A parent tells how the child\'s first visit went, how the little one felt and why they would recommend the clinic to friends.'],
    'Կարծիքի տեքստը կլինի այստեղ։ Մի քանի նախադասություն բժշկի ուշադրության, հանգիստ մթնոլորտի և այն մասին, որ երեխան այժմ ուրախությամբ է գնում ատամնաբույժի մոտ։': ['Текст отзыва будет здесь. Несколько предложений о внимании врача, спокойной атмосфере и о том, что теперь ребёнок с радостью идёт к стоматологу.', 'The review text will be here. A few sentences about the doctor\'s attention, the calm atmosphere and how the child now happily goes to the dentist.'],
    'Կարծիքի տեքստը կլինի այստեղ։ Ծնողի տպավորությունները բուժման, անձնակազմի վերաբերմունքի և կլինիկայի հարմարավետության մասին։': ['Текст отзыва будет здесь. Впечатления родителя о лечении, отношении персонала и комфорте клиники.', 'The review text will be here. A parent\'s impressions of the treatment, the staff\'s attitude and the comfort of the clinic.'],
    'Կարծիքի տեքստը կլինի այստեղ։ Կարճ պատմություն այն մասին, թե ինչպես օգնեցին սուր ցավի դեպքում և որքան արագ ամեն ինչ կազմակերպվեց։': ['Текст отзыва будет здесь. Короткая история о том, как помогли при острой боли и как быстро всё организовали.', 'The review text will be here. A short story about how they helped with acute pain and how quickly everything was arranged.'],

    'Մեր ժպիտները': ['Наши улыбки', 'Our smiles'],

    'Հավաքել ենք այն հարցերը, որոնք ծնողներն ամենից հաճախ են տալիս, որպեսզի այցը հանգիստ անցնի և՛ ձեզ, և՛ երեխայի համար։': ['Мы собрали вопросы, которые родители задают чаще всего, чтобы визит прошёл спокойно и для вас, и для ребёнка.', 'We have gathered the questions parents ask most often, so the visit goes smoothly for both you and your child.'],
    'Ե՞րբ պետք է երեխային առաջին անգամ բերել ստոմատոլոգի մոտ': ['Когда впервые приводить ребёнка к стоматологу?', 'When should a child first visit the dentist?'],
    'Լավագույնն է գալ առաջին ատամի ելքից հետո, բայց ոչ ուշ, քան 1 տարեկանում։ Առաջին այցը բուժման համար չէ․ երեխան ծանոթանում է կլինիկայի, բժշկի և աթոռի հետ, իսկ մենք գնահատում ենք բերանի խոռոչի վիճակը և ծնողներին տալիս ենք խնամքի խորհուրդներ։': ['Лучше прийти после прорезывания первого зуба, но не позже 1 года. Первый визит не для лечения: ребёнок знакомится с клиникой, врачом и креслом, а мы оцениваем состояние полости рта и даём родителям советы по уходу.', 'The best time is after the first tooth appears, but no later than age 1. The first visit is not for treatment: the child gets to know the clinic, the doctor and the chair, while we assess the condition of the mouth and give parents care advice.'],
    'Պե՞տք է արդյոք բուժել կաթնատամները, եթե միևնույն է՝ փոխվելու են': ['Нужно ли лечить молочные зубы, если они всё равно сменятся?', 'Do baby teeth need treatment if they will fall out anyway?'],
    'Այո՛։ Կաթնատամները օգնում են երեխային ծամել և ճիշտ խոսել, ինչպես նաև տեղ են պահում մշտական ատամների համար։ Չբուժված կարիեսը կարող է առաջացնել ցավ ու բորբոքում, անցնել հարևան ատամներին և վնասել դեռ չելած մշտական ատամի սաղմը։': ['Да! Молочные зубы помогают ребёнку жевать и правильно говорить, а также сохраняют место для постоянных зубов. Нелеченый кариес может вызвать боль и воспаление, перейти на соседние зубы и повредить зачаток ещё не прорезавшегося постоянного зуба.', 'Yes! Baby teeth help a child chew and speak correctly and also hold space for permanent teeth. Untreated cavities can cause pain and inflammation, spread to neighbouring teeth and damage the bud of a permanent tooth that has not yet erupted.'],
    'Բուժումը ցավո՞տ է։': ['Лечение болезненно?', 'Is the treatment painful?'],
    'Մեր նպատակն է, որ բուժումն անցնի առանց ցավի և սթրեսի։ Օգտագործում ենք երեխաների համար նախատեսված ժամանակակից անզգայացնող միջոցներ։ Բժիշկները աշխատում են խաղային մոտեցմամբ՝ ամեն քայլը նախապես բացատրում և ցույց են տալիս։': ['Наша цель — чтобы лечение прошло без боли и стресса. Мы используем современные обезболивающие средства, предназначенные для детей. Врачи работают в игровой форме: заранее объясняют и показывают каждый шаг.', 'Our goal is for treatment to be painless and stress-free. We use modern anaesthetics designed for children. The doctors work in a playful way: they explain and show every step in advance.'],

    'Գրանցվեք': ['Запишитесь', 'Book a visit'],
    'Եկեք ծանոթանանք: Թողեք ձեր համարը, և մենք կկապնվենք ձեզ հետ՝ հարմար ժամ ընտրելու համար։': ['Давайте знакомиться! Оставьте свой номер, и мы свяжемся с вами, чтобы выбрать удобное время.', 'Let\'s get to know each other! Leave your number and we will contact you to choose a convenient time.'],
    'Ծնողի անունը': ['Имя родителя', 'Parent\'s name'],
    'Հեռախոսահամար': ['Телефон', 'Phone number'],
    'Երեխայի անունը': ['Имя ребёнка', 'Child\'s name'],
    'Տարիքը': ['Возраст', 'Age'],
    'Ծառայություն': ['Услуга', 'Service'],
    'Զննում': ['Осмотр', 'Check-up'],
    'Բուժում': ['Лечение', 'Treatment'],
    'Օրթոդոնտիա': ['Ортодонтия', 'Orthodontics'],
    'Շտապ': ['Срочно', 'Urgent'],
    'Մեկնաբանություն': ['Комментарий', 'Comment'],
    'Անուն': ['Имя', 'Name'],
    'Ինչ է անհանգստացնում երեխային': ['Что беспокоит ребёнка', 'What is bothering your child'],
    'Շնորհակալություն': ['Спасибо', 'Thank you'],
    'Մենք շուտով կզանգահարենք ձեզ՝ հարմար ժամ ընտրելու համար։': ['Мы скоро позвоним вам, чтобы выбрать удобное время.', 'We will call you soon to choose a convenient time.'],

    'Երևան, հասցե': ['Ереван, адрес', 'Yerevan, address'],
    'Ամեն օր 10:00–20:00': ['Ежедневно 10:00–20:00', 'Daily 10:00–20:00'],
    'ՀՀ զինանշան': ['Герб Армении', 'Coat of arms of Armenia'],
    'Ատամնաբուժարանը վերահսկվում է ՀՀ առողջապահության նախարարության կողմից:': ['Стоматологическая клиника находится под надзором Министерства здравоохранения Армении.', 'The clinic is supervised by the Ministry of Health of Armenia.'],
    'Սեղմելով կոճակը՝ համաձայնում եք անձնական տվյալների մշակմանը։': ['Нажимая кнопку, вы соглашаетесь на обработку персональных данных.', 'By pressing the button, you agree to the processing of personal data.']
  };

  var IDX = { ru: 0, en: 1 };
  var ATTRS = ['placeholder', 'aria-label', 'alt'];
  var items = [];

  var swap = function (raw, key, lang) {
    if (lang === 'hy') return raw;
    var t = D[key][IDX[lang]];
    return raw.match(/^\s*/)[0] + t + raw.match(/\s*$/)[0];
  };

  var collect = function () {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) {
      var p = n.parentNode ? n.parentNode.nodeName : '';
      if (p === 'SCRIPT' || p === 'STYLE') continue;
      var k = norm(n.nodeValue);
      if (k && D[k]) {
        items.push({ set: (function (node) { return function (v) { node.nodeValue = v; }; })(n), raw: n.nodeValue, key: k });
      }
    }
    ATTRS.forEach(function (a) {
      document.querySelectorAll('[' + a + ']').forEach(function (el) {
        var v = el.getAttribute(a);
        var k = norm(v);
        if (k && D[k]) {
          items.push({ set: function (x) { el.setAttribute(a, x); }, raw: v, key: k });
        }
      });
    });
  };

  var collectHead = function () {
    var tk = norm(document.title);
    if (D[tk]) items.push({ set: function (x) { document.title = x; }, raw: document.title, key: tk });
    document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(function (m) {
      var v = m.getAttribute('content') || '';
      var k = norm(v);
      if (k && D[k]) items.push({ set: function (x) { m.setAttribute('content', x); }, raw: v, key: k });
    });
  };

  var apply = function (lang) {
    items.forEach(function (it) { it.set(swap(it.raw, it.key, lang)); });
    document.documentElement.lang = lang;
  };

  collect();
  collectHead();

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-lang')); });
  });
})();
