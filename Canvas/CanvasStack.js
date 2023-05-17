"use client";

import React, { useEffect } from "react";
import canvasSketch from 'canvas-sketch';
import { random } from 'canvas-sketch-util';

function loadImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

function inRange(value, min, max) {
    return value >= min && value <= max;
}

class Particle {
    constructor({ x, y, radius, imageURL }) {

        // initial postiion 
        this.x = x;
        this.y = y;

        // acceleration
        this.ax = 0;
        this.ay = 0;

        // velocity
        this.vx = 0;
        this.vy = 0;

        this.radius = radius;
        this.minDist = random.range(180, 240);
        this.loaded = false;
        loadImage(imageURL).then(image => {
            this.image = image;
            this.loaded = true;
        });
    }

    // update position of the particle
    update( width, height ) {
        const radius = this.radius;
        let dx, dy, dd, distDelta;
        const friction = 0.2;
        const maxAcc = 2;
        let damping = 0.000018 * radius;


        // push force
        dx = this.x - cursor.x;
        dy = this.y - cursor.y;
        dd = Math.sqrt(dx * dx + dy * dy);

        distDelta = this.minDist - dd;

        // check if the particle is colliding with another particle
        for (let i = 0; i < particles.length; i++) {
            let otherParticle = particles[i];

            if (otherParticle !== this) {
                let dx2 = this.x - otherParticle.x;
                let dy2 = this.y - otherParticle.y;
                let dd2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (dd2 < this.radius * 0.5 + otherParticle.radius * 0.5) {
                    // calculate the collision angle
                    let collisionAngle = Math.atan2(dy2, dx2);
                    // calculate the initial velocities in polar coordinates
                    let v1r = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                    let v1a = Math.atan2(this.vy, this.vx);
                    let v2r = Math.sqrt(otherParticle.vx * otherParticle.vx + otherParticle.vy * otherParticle.vy);
                    let v2a = Math.atan2(otherParticle.vy, otherParticle.vx);
                    // calculate the parallel and perpendicular components of the initial velocities
                    let v1p = v1r * Math.cos(v1a - collisionAngle);
                    let v1n = v1r * Math.sin(v1a - collisionAngle);
                    let v2p = v2r * Math.cos(v2a - collisionAngle);
                    let v2n = v2r * Math.sin(v2a - collisionAngle);
                    // define the coefficient of restitution
                    let e = 0.95;
                    // calculate the masses of the particles (assuming they are proportional to the radius)
                    let m1 = this.radius;
                    let m2 = otherParticle.radius;
                    // calculate the parallel components of the final velocities using the general formula
                    let u1p = ((v1p * (m1 - e * m2)) + (v2p * (1 + e) * m2)) / (m1 + m2);
                    let u2p = ((v2p * (m2 - e * m1)) + (v1p * (1 + e) * m1)) / (m1 + m2);
                    // calculate the perpendicular components of the final velocities (they are equal to the initial ones)
                    let u1n = v1n;
                    let u2n = v2n;
                    // convert the parallel and perpendicular components of the final velocities to cartesian coordinates
                    let u1x = u1p * Math.cos(collisionAngle) + u1n * Math.cos(collisionAngle + Math.PI / 2);
                    let u1y = u1p * Math.sin(collisionAngle) + u1n * Math.sin(collisionAngle + Math.PI / 2);
                    let u2x = u2p * Math.cos(collisionAngle) + u2n * Math.cos(collisionAngle + Math.PI / 2);
                    let u2y = u2p * Math.sin(collisionAngle) + u2n * Math.sin(collisionAngle + Math.PI / 2);
                    // apply the final velocities to the particles
                    this.vx = u1x;
                    this.vy = u1y;
                    otherParticle.vx = u2x;
                    otherParticle.vy = u2y;
                    // move the particles away from each other to avoid overlapping
                    let overlapDistance = (this.radius * 0.5 + otherParticle.radius * 0.5) - dd2;
                    let moveX = overlapDistance * Math.cos(collisionAngle) / 2;
                    let moveY = overlapDistance * Math.sin(collisionAngle) / 2;
                    this.x += moveX;
                    this.y += moveY;
                    otherParticle.x -= moveX;
                    otherParticle.y -= moveY;
                }
            }
        }

        if (dd < this.minDist) {
            this.ax += (dx / dd) * distDelta * 0.02;
            this.ay += (dy / dd) * distDelta * 0.02;
        }

        // limit acc
        let ad = Math.sqrt(this.ax * this.ax + this.ay * this.ay);
        if (ad > maxAcc) {
            this.ax = (this.ax / ad) * maxAcc;
            this.ay = (this.ay / ad) * maxAcc;
        }

        // Apply aceleration to vel.
        this.vx += this.ax;
        this.vy += this.ay;

        // Apply vel. to position
        this.x += this.vx;
        this.y += this.vy;

        // Apply friction to vel.
        this.vx -= this.vx * friction;
        this.vy -= this.vy * friction;

        // calculate the damping force
        let fx = -damping * this.vx;
        let fy = -damping * this.vy;

        // apply the damping force to the acceleration
        this.ax += fx;
        this.ay += fy;

        // check if particle is toaching the width limits
        if (!inRange(this.x + this.vx + this.ax, radius, width - radius)) {
            // Move particle to the edge
            this.x = Math.max(radius, Math.min(this.x, width - radius));
            // Invert the sign of the vel.
            this.vx = -this.vx;
            // Invert the sign of the acc.
            this.ax = -this.ax;
        }
        
        // check if particle is toaching the width limits
        if (!inRange(this.y + this.vy + this.ay, radius, height - radius)) {
            // Move particle to the edge
            this.y = Math.max(radius, Math.min(this.y, height - radius));
            // Invert the sign of the vel.
            this.vy = -this.vy;
            // Invert the sign of the acc.
            this.ay = -this.ay;
        }
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);

        if (this.loaded) {
            // use the drawImage method to draw the image in the center of the particle
            context.drawImage(this.image, Math.round(-this.radius / 2), Math.round(-this.radius / 2), Math.round(this.radius), Math.round(this.radius));
        } else {
            // draw a circle of color as a placeholder
            context.fillStyle = 'grey';
            context.beginPath();
            context.arc(0, 0, this.radius * 0.5, 0, Math.PI * 2);
            context.fill();
        }
        context.restore();
    }
}

const cursor = { x: 9999, y: 9999};

const onMouseMove = (e) => {
    const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width;
    const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height;
    
    cursor.x = x;
    cursor.y = y;
};

let elCanvas;
const particles = [];
const radius = [180, 150, 70, 96, 120, 90, 80, 105, 145, 170, 75, 95, 90, 85, 90, 110, 110];
const imagesURLs = [
    'https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png',
    'http://www.agersi.com/wp-content/uploads/2021/05/React.png',
    'https://assets.stickpng.com/images/62a765a3bd73a4af5c5d4fba.png',
    'https://logodownload.org/wp-content/uploads/2022/04/javascript-logo-1.png',
    'https://repository-images.githubusercontent.com/347723622/92065800-865a-11eb-9626-dff3cb7fef55',
    'https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/node-512.png',
    'https://www.shareicon.net/download/2016/07/08/117547_developer_512x512.png',
    'https://mui.com/static/logo.png',
    'https://i.morioh.com/2021/08/01/c09b16f5.webp',
    'https://cdn-icons-png.flaticon.com/512/919/919832.png',
    'https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sketch_Logo.svg/2267px-Sketch_Logo.svg.png',
    'https://vitejs.dev/logo-with-shadow.png',
    'https://authy.com/wp-content/uploads/npm-logo.png',
    'https://code4developers.com/wp-content/uploads/2019/10/MongoDBicon.png',
    'https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/html5-512.png',
    'https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png',
];

const sketch = ({ width, height, canvas }) => {
    let x, y, particle;

    canvas.style.width = "1248px";
    canvas.style.height = "600px";

    elCanvas = canvas;

    // Loop through the images array and create a logo of each image with random coordinates
    for (let i = 0; i < imagesURLs.length ; i++){
        x = random.range(0,width - 150); // random x coordinate between 0 and width
        y = random.range(0,height - 150); // random y coordinate between 0 and height

        particle = new Particle({ x, y, radius: radius[i], imageURL: imagesURLs[i] }); // create a particle with the image

        particles.push(particle);
    }

    canvas.addEventListener('mousemove', onMouseMove);

    return ({ context, width, height }) => {

        // Clean background canvas
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        particles.forEach( particle => {
            particle.update(width, height);
            particle.draw(context);
        })
    };
};

export default function CanvasStack() {
    const canvasRef = React.useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const settings = {
            dimensions: [1248, 600],
            animate: true,
            canvas: canvas, // use existing canvas element
        };

        canvasSketch(sketch, settings);
    }, []);

    return <canvas ref={canvasRef} />;
}