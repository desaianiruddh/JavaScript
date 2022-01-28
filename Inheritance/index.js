//parent class
class student {
	//properties of student
	constructor(name, city, age, standard) {
		this.name = name;
		this.city = city;
		this.age = age;
		this.std = standard;
	}
	//instance method
	showInfo() {
		return `I am ${this.name}. I am from ${this.city}. I am ${this.age} years old and Studying in standard ${this.std}th.`;
	}
}
//new student obj using class
const student1 = new student('Darsh', 'Surat', 21, '12');
console.log(student1.showInfo());
//child class of student
class player extends student {
	//player class properties derived from parent class
	constructor(name, city, age, standard, game) {
		super(name, city, age, standard);
		this.game = game;
	}
	//class method
	showPlayerInfo() {
		return `${super.showInfo()} I am playing ${this.game}`;
	}
	
}
const player1 = new player('Darsh', 'Surat', 17, '12', 'hockey');
console.log(player1.showPlayerInfo());
const player2 = new player('Monil', 'Amreli', 15, '10', 'football');
console.log(player2.showPlayerInfo());