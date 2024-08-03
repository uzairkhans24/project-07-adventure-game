#!/usr/bin/env node

import * as readline from 'readline';

enum Direction {
    North = "north",
    South = "south",
    East = "east",
    West = "west"
}

interface Room {
    description: string;
    directions: { [key in Direction]?: string };
}

class AdventureGame {
    private rooms: { [key: string]: Room };
    private currentRoom: string;

    constructor() {
        this.rooms = {
            "entrance": {
                description: "You are at the entrance of a dark cave.",
                directions: {
                    [Direction.North]: "hallway"
                }
            },
            "hallway": {
                description: "You are in a long hallway. There is a door to the north.",
                directions: {
                    [Direction.South]: "entrance",
                    [Direction.North]: "treasureRoom"
                }
            },
            "treasureRoom": {
                description: "You have found the treasure room! You win!",
                directions: {
                    [Direction.South]: "hallway"
                }
            }
        };
        this.currentRoom = "entrance";
    }

    start() {
        console.log("Welcome to the adventure game!");
        this.showCurrentRoom();
        this.promptUser();
    }

    private showCurrentRoom() {
        console.log(this.rooms[this.currentRoom].description);
    }

    private promptUser() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Which direction do you want to go? (north/south/east/west): ", (answer) => {
            this.handleInput(answer as Direction);
            rl.close();
            this.showCurrentRoom();
            if (this.currentRoom !== "treasureRoom") {
                this.promptUser();
            }
        });
    }

    private handleInput(direction: Direction) {
        const nextRoom = this.rooms[this.currentRoom].directions[direction];
        if (nextRoom) {
            this.currentRoom = nextRoom;
        } else {
            console.log("You can't go that way.");
        }
    }
}

const game = new AdventureGame();
game.start();
