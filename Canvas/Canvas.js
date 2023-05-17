'use client';

import React, { useEffect, useRef, useState } from "react";
import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';
import math from 'canvas-sketch-util/math';
import eases from 'eases';
import colormap from 'colormap';
import interpolate from 'color-interpolate';

import { useScreenHeight } from "../hooks/useScreenHeight";
import useScreenWidth from "../hooks/useScreenWidth";

let scrollPosition = 0;

function updateScrollPosition() {
  const newPosition = window.scrollY;
  requestAnimationFrame(() => {
    scrollPosition = newPosition;
  });
}

export default function Canvas() {

  const [imgLoaded, setImgLoaded] = useState(false);

  const screenHeight = useScreenHeight();
  const screenWidth = useScreenWidth();

  const settings = {
    dimensions: [screenWidth, screenHeight],
    animate: true,
  };

  const particles = [];
  const cursor = { x: 9999, y: 9999 };

  // const colors = colormap({ colormap: 'viridis', nshades: 20, });

  const colors = colormap({ 
    colormap: [
      { index: 0, rgb: [ 4, 85, 70 ] },
      { index: 0.33, rgb: [ 35, 127, 116 ] },
      { index: 0.67, rgb: [ 209, 81, 94 ] },
      { index: 1, rgb: [ 144, 55, 57 ] },
    ],
    nshades: 20,
    format: 'hex',
    alpha: 1,
  });

  const imgRefA = useRef(null);
  const imgRefB = useRef(null);

  let imgA = imgRefA.current;
  let imgB = imgRefB.current;

  let elCanvas;

  let imgACanvas = document.createElement('canvas');
  let imgAContext = imgACanvas.getContext('2d');

  let imgBCanvas = document.createElement('canvas');
  let imgBContext = imgBCanvas.getContext('2d');
  
  const sketch = ({ canvas }) => {

    const width = screenHeight * 0.8;
    const height = screenHeight * 0.8;
    let x, y, particle, radius;


    const div = document.getElementById('canvasDiv');
    div?.appendChild(canvas);

    imgACanvas.width = imgA.width;
    imgACanvas.height = imgA.height;

    imgBCanvas.width = imgB.width;
    imgBCanvas.height = imgB.height;

    imgAContext.drawImage(imgA, 0, 0);

    imgBContext.drawImage(imgB, 0, 0);

    const imgAData = imgAContext.getImageData(0, 0, imgA.width, imgA.height).data;
    const imgBData = imgBContext.getImageData(0, 0, imgB.width, imgB.height).data;

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

        radius = math.mapRange(r, 0, 255, 3, 9);

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

        particle = new Particle({ x, y, radius, colMap });
        particles.push(particle);
      }

      cirRadius += fitRadius * 2 + gapCircle;
      dotRadius = (1 - eases.quadOut(i / numCircles)) * fitRadius;
    }

    return ({ context, width, height }) => {

      canvas.getContext('2d');

      context.scale(screenWidth / width, screenHeight / height)

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
    cursor.y = y + scrollPosition;
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
      imgRefA.current = await loadImage('/img/perfilStudio.jpg');
      imgRefB.current = await loadImage('/img/colors-triangle.jpg');

      setImgLoaded(true);
    }

    start();
    }, []);

    useEffect(() => {
      if (imgLoaded) {
        const instance = canvasSketch(sketch, settings);
        
        let ctx;
        ctx = imgACanvas.getContext('2d');
        ctx = imgBCanvas.getContext('2d');
        // const canvasDiv = document.getElementById('canvasDiv');
        const canvasDiv = document.querySelector('#canvasDiv');
        const nodeCanvas = canvasDiv?.childNodes[0];
    
        return () => {
          ctx.clearRect(0, 0, imgACanvas.width, imgACanvas.height);
          ctx.clearRect(0, 0, imgBCanvas.width, imgBCanvas.height);
          imgACanvas = null;
          imgBCanvas = null;
          imgAContext = null;
          imgBContext = null;
          canvasDiv?.removeChild(nodeCanvas);
          // canvasDiv.innerHTML = '';
          canvasDiv?.remove();
          // instance.stop();
          // setCanvasSketchInstance(null);
        };
      } 
    }, [imgLoaded, scrollPosition]);

  class Particle {
    constructor({ x, y, radius = 10, colMap }) {
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
      this.ix = x + 160; 
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

      // idxColor = Math.floor(math.mapRange( dd, 0, 200, 0, colors.length -1, true ))
      // this.color = colors[idxColor];
      this.color = this.colMap(math.mapRange(dd, 0, 200, 0, 1, true));

      // this.color = this.color

      // push force
      dx = this.x - cursor.x;
      dy = this.y - cursor.y + scrollPosition;
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
    <div id="canvasDiv" className="z-0 min-h-screen h-screen">
      <imgACanvas className="absolute min-h-screen h-screen"/>
    </div>
  )
}