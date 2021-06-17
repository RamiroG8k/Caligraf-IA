export const toTitleCase = (phrase: string): string => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0)
            .toUpperCase() + word.slice(1))
        .join(' ');
};

export const toMinString = (phrase: string): string => {
    if (phrase.length > 13) {
        return phrase.slice(0, 10) + '...';
    }
    return phrase;
}

export const toLocalDate = (date: Date): string => {
    const options: object = {
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: '2-digit'
    };

    return new Date(date)
        .toLocaleString('es-MX', options);
}

export const getRandomObject = (array: Array<any>): any => {
    return array[Math.floor(Math.random()*array.length)];
};

export function actualWeek() {
    let current = new Date();
    let week= new Array(); 
    
    // Starting Monday not Sunday
    current.setDate((current.getDate() - current.getDay() +1));
    for (let i = 0; i < 7; i++) {
        week.push(
            new Date(current)
        ); 
        current.setDate(current.getDate() + 1);
    }
    return week; 
}
