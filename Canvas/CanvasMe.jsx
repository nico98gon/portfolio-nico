"use client";

import { useEffect, useRef, useState } from "react";
import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';
import math from 'canvas-sketch-util/math';
import eases from 'eases';
import interpolate from 'color-interpolate';

import { useScreenHeight } from "../hooks/useScreenHeight";
import useScreenWidth from "../hooks/useScreenWidth";


let elCanvas;
const particles = [];
const cursor = { x: 9999, y: 9999 };

class Particle {
    constructor({ x, y, radius = 10, colMap, xInitialPosition}) {
        //postiion
        this.x = x; 
        this.y = y;

        //acceleration
        this.ax = 0; 
        this.ay = 0;

        //velocity
        this.vx = 0; 
        this.vy = 0;

        //initial position
        this.ix = x + xInitialPosition;
        this.iy = y + 40;

        this.radius = radius;
        this.scale = 1;
        this.colMap = colMap;
        this.color = colMap(0);

        this.minDist = random.range(100, 200);
        this.pushFactor = random.range(0.01, 0.02)
        this.pullFactor = random.range(0.002, 0.006)
        this.dumpFactor = random.range(0.9, 0.95);
    }

    update() {
        let dx, dy, dd, distDelta;
        let idxColor;

        //pull force
        dx = this.ix - this.x;
        dy = this.iy - this.y  + scrollPosition;
        dd = Math.sqrt( dx * dx + dy * dy );

        this.ax = dx * this.pullFactor;
        this.ay = dy * this.pullFactor;

        this.scale = math.mapRange(dd, 0, 200, 1, 5);

        this.color = this.colMap(math.mapRange(dd, 0, 200, 0, 1, true));

        // push force
        dx = this.x - cursor.x + (scrollPosition * random.range(2, 4));
        dy = this.y - cursor.y + (scrollPosition * random.range(5, 10));
        dd = Math.sqrt( dx * dx + dy * dy );

        distDelta = this.minDist - dd;

        if (dd < this.minDist) {
            this.ax += (dx / dd) * distDelta * this.pushFactor;
            this.ay += (dy / dd) * distDelta * this.pushFactor;
        }

        this.vx += this.ax;
        this.vy += this.ay;

        this.vx *= this.dumpFactor;
        this.vy *= this.dumpFactor;

        this.x += this.vx;
        this.y += this.vy;
        }

        draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = this.color;

        context.beginPath();
        context.arc(0, 0, this.radius * this.scale, 0, Math.PI * 2);
        context.fill();

        context.restore();
    }
}

const onMouseMove = (e) => {
    const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width;
    const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height;

    cursor.x = x;
    cursor.y = y + scrollPosition;
};

let scrollPosition = 0;

function updateScrollPosition() {
    const newPosition = window.scrollY;
    
    requestAnimationFrame(() => {
        scrollPosition = newPosition;
    });
}

let created = false;

let imgA, imgB, imgAContext, imgBContext;

let imgACanvas = document.createElement('canvas');
let imgBCanvas = document.createElement('canvas');

const sketch = ({ canvas }) => {
    let x, y, particle, radius;
    const numCircles = 20;
    const gapCircle = 8;
    const gapDot = 5;
    let dotRadius = 4;
    let cirRadius = 0;
    const fitRadius = dotRadius;
    let xInitialPosition;

    let width = canvas.width;
    let height = canvas.height;

    if ( width < 500 ) {
        xInitialPosition = -80;
    }
    else if ( width < 800 ) {
        xInitialPosition = 95;
    }
    else if ( width < 1050 ) {
        xInitialPosition = 20;
    }
    else if ( width < 1500 ) {
        xInitialPosition = 90;
    } else {
        xInitialPosition = 160;
    }

    elCanvas = canvas;

    elCanvas.style.width = `${width}px`;
    elCanvas.style.height = `${height}px`;

    width = height * 0.7;
    height = height * 0.7;

    imgACanvas.width = imgA.width;
    imgACanvas.height = imgA.height;

    imgBCanvas.width = imgB.width;
    imgBCanvas.height = imgB.height;

    imgAContext = imgACanvas.getContext('2d');
    imgAContext.drawImage(imgA, 0, 0);

    imgBContext = imgBCanvas.getContext('2d');
    imgBContext.drawImage(imgB, 0, 0);

    const imgAData = imgAContext.getImageData(0, 0, imgA.width, imgA.height).data;
    const imgBData = imgBContext.getImageData(0, 0, imgB.width, imgB.height).data;

    canvas.addEventListener('mousemove', onMouseMove);

    if (!created) {
        for (let i = 0; i < numCircles; i++) {
            const circumference = Math.PI * 2 * cirRadius;
            const numFit = i ? Math.floor(circumference / (fitRadius * 2 + gapDot)): 1;
            const fitSlice = Math.PI * 2 / numFit;
            let  ix, iy, idx, r, g, b, colA, colB, colMap;

            for (let j = 0; j < numFit; j++) {
                const theta = fitSlice * j;

                x = Math.cos(theta) * cirRadius;
                y = Math.sin(theta) * cirRadius;

                x += width * 0.5;
                y += height * 0.5;

                ix = Math.floor((x / width) * imgA.width);
                iy = Math.floor((y / height) * imgA.height);
                idx = (iy * imgA.width + ix) * 4;

                r = imgAData[idx + 0];
                g = imgAData[idx + 1];
                b = imgAData[idx + 2];
                colA = `rgb(${r}, ${g}, ${b})`

                radius = math.mapRange(r, 0, 255, 3, 9); //(r, 0, 255, 7, 7)

                ix = Math.floor((x / width) * imgB.width);
                iy = Math.floor((y / height) * imgB.height);
                idx = (iy * imgB.width + ix) * 4;

                r = imgBData[idx + 0];
                g = imgBData[idx + 1];
                b = imgBData[idx + 2];
                colB = `rgb(${r}, ${g}, ${b})`

                colMap = interpolate([colA, colB]);

                window.addEventListener('scroll', () => {
                    updateScrollPosition();
                });

                particle = new Particle({ x, y, radius, colMap, xInitialPosition });
                particles.push(particle);

            }
            cirRadius += fitRadius * 2 + gapCircle;
            dotRadius = (1 - eases.quadOut(i / numCircles)) * fitRadius;
        }
        created = true;
    }
    return ({ context, width, height }) => {

        canvas.getContext('2d');

        context.fillRect(0, 0, width, height);
        context.clearRect(0, 0, width, height);

        particles.sort((a, b) => a.scale - b.scale); // Draw firts big particles

        particles.forEach( particle => {
            particle.update();
            particle.draw(context);
        })
    };
};

export default function CanvasMe() {
    const canvasRef = useRef(null);
    
    // const imgRefA = useRef(null);
    // const imgRefB = useRef(null);
    
    const [imgLoaded, setImgLoaded] = useState(false);

    const screenWidth = useScreenWidth();
    const screenHeight = useScreenHeight();

    useEffect(() => {
        const loadImage = async (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject();
                img.src = url;
            });
        };
    
        const start = async () => {
            imgA = await loadImage('/img/perfilStudio.jpg');
            imgB = await loadImage('/img/colors-triangle.jpg');
        
            setImgLoaded(true);
        }
    
        start();
    }, []);

    // useEffect(() => {
        if (imgLoaded) {
            const canvas = canvasRef.current;

            const settings = {
                dimensions: [screenWidth, screenHeight],
                animate: true,
                fps: 144,
                canvas: canvas, // use existing canvas element
            };
            canvasSketch(sketch, settings);
        }
    // }, [imgLoaded, scrollPosition]);

    return <canvas ref={canvasRef} width={`${screenWidth}`} height={`${screenHeight}`}/>;
}
