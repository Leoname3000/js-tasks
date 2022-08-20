let str = 
`Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

let re = /ПОНЕДЕЛЬНИК|ВТОРНИК|СРЕДА|ЧЕТВЕРГ|ПЯТНИЦА|СУББОТА|ВОСКРЕСЕНЬЕ/gi;

let map = new Map();

map.set("ПОНЕДЕЛЬНИК", "MONDAY");
map.set("ВТОРНИК", "TUESDAY");
map.set("СРЕДА", "WEDNESDAY");
map.set("ЧЕТВЕРГ", "THURSDAY");
map.set("ПЯТНИЦА", "FRIDAY");
map.set("СУББОТА", "SATURDAY");
map.set("ВОСКРЕСЕНЬЕ", "SUNDAY");

let newStr = str.replace(re, (match) => { 
    return map.get(match);
});

console.log(newStr);