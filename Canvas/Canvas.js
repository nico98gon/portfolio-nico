'use client';

import React, { useEffect, useRef, useState } from "react";
import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';
import math from 'canvas-sketch-util/math';
import eases from 'eases';
import colormap from 'colormap';

import { useScreenHeight } from "../hooks/useScreenHeight";
import useScreenWidth from "../hooks/useScreenWidth";

export default function Canvas() {

  const [imgLoaded, setImgLoaded] = useState(false);

  const screenHeight = useScreenHeight();
  const screenWidth = useScreenWidth();

  const settings = {
    dimensions: [screenWidth, screenHeight ],
    animate: true,
  };

  const particles = [];
  const cursor = { x: 9999, y: 9999 };

  const colors = colormap({ 
    colormap: [
      { index: 0, rgb: [ 4, 85, 70 ] },
      { index: 0.33, rgb: [ 35, 127, 116 ] },
      { index: 0.67, rgb: [ 209, 81, 94 ] },
      { index: 1, rgb: [ 144, 55, 57 ] },
    ],
    nshades: 20,
    format: 'rgb',
    alpha: 2,
  });

  const imgRef = useRef(null);
  let elCanvas;
  let imgA = imgRef.current;

  const sketch = ({ canvas }) => {

    const width = screenHeight * 0.8;
    const height = screenHeight * 0.8;
    let x, y, particle, radius;

    const imgACanvas = document.createElement('canvas');
    const imgAContext = imgACanvas.getContext('2d');

    const div = document.getElementById('canvasDiv');
    div.appendChild(canvas);

    imgACanvas.width = imgA.width;
    imgACanvas.height = imgA.height;

    imgAContext.drawImage(imgA, 0, 0);

    const imgAData = imgAContext.getImageData(0, 0, imgA.width, imgA.height).data;

    const numCircles = 20;
    const gapCircle = 8;
    const gapDot = 5;
    let dotRadius = 4;
    let cirRadius = 0;
    const fitRadius = dotRadius;

    elCanvas = canvas;

    canvas.addEventListener('mousemove', onMouseMove);

    for (let i = 0; i < numCircles; i++) {
      const circumference = Math.PI * 2 * cirRadius;
      const numFit = i ? Math.floor(circumference / (fitRadius * 2 + gapDot)): 1;
      const fitSlice = Math.PI * 2 / numFit;
      let  ix, iy, idx, r, g, b, colA;

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

        radius = math.mapRange(r, 0, 255, 3, 9);

        particle = new Particle({ x, y, radius, colA });
        particles.push(particle);
      }

      cirRadius += fitRadius * 2 + gapCircle;
      dotRadius = (1 - eases.quadOut(i / numCircles)) * fitRadius;
    }

    return ({ context, width, height }) => {
      // context.fillStyle = 'white';
      // context.globalAlpha = 0.5;
      context.fillRect(0, 0, width, height);
      context.clearRect(0, 0, width, height);

      particles.sort((a, b) => a.scale - b.scale); // Draw firts big particles

      particles.forEach( particle => {
        particle.update();
        particle.draw(context);
      })
    };
  };

  const onMouseMove = (e) => {
    const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width;
    const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height;

    cursor.x = x;
    cursor.y = y;
  };

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
      // imgA = await loadImage('/img/perfilStudio.jpg');
      imgRef.current = await loadImage('/img/perfilStudio.jpg');
      setImgLoaded(true);
    }

    start();
    }, []);

    useEffect(() => {
      if (imgLoaded) {
        canvasSketch(sketch, settings);
      }
    }, [imgLoaded]);

  class Particle {
    constructor({ x, y, radius = 10, colA }) {
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
      this.ix = x; 
      this.iy = y;

      this.radius = radius;
      this.scale = 1;
      this.color = colA;

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
      dy = this.iy - this.y;
      dd = Math.sqrt( dx * dx + dy * dy );

      this.ax = dx * this.pullFactor;
      this.ay = dy * this.pullFactor;

      this.scale = math.mapRange(dd, 0, 200, 1, 5);

      // push force
      dx = this.x - cursor.x;
      dy = this.y - cursor.y;
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

  return (
    <div id="canvasDiv" className="mt-5 z-10">
      <imgACanvas className="absolute"/>
    </div>
  )
}