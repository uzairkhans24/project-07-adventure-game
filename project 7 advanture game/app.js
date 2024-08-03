#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
var Direction;
(function (Direction) {
    Direction["North"] = "north";
    Direction["South"] = "south";
    Direction["East"] = "east";
    Direction["West"] = "west";
})(Direction || (Direction = {}));
class AdventureGame {
    rooms;
    currentRoom;
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
    showCurrentRoom() {
        console.log(this.rooms[this.currentRoom].description);
    }
    promptUser() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question("Which direction do you want to go? (north/south/east/west): ", (answer) => {
            this.handleInput(answer);
            rl.close();
            this.showCurrentRoom();
            if (this.currentRoom !== "treasureRoom") {
                this.promptUser();
            }
        });
    }
    handleInput(direction) {
        const nextRoom = this.rooms[this.currentRoom].directions[direction];
        if (nextRoom) {
            this.currentRoom = nextRoom;
        }
        else {
            console.log("You can't go that way.");
        }
    }
}
const game = new AdventureGame();
game.start();
