import React, { useEffect, useRef } from "react";

function Loading() {
  const canvasRef = useRef(null); // useRef를 사용하여 캔버스를 참조합니다.

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size to full screen
    function resizeCanvas() {
      canvas.width = window.innerWidth; // Canvas의 해상도를 브라우저 너비로 설정
      canvas.height = window.innerHeight; // Canvas의 해상도를 브라우저 높이로 설정
    }

    window.addEventListener("resize", resizeCanvas); // 화면 크기 변화에 따라 캔버스 크기 조정
    resizeCanvas(); // 초기 화면 크기 조정

    /* Vector Class */
    class Vector {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      sub(v) {
        this.x -= v.x;
        this.y -= v.y;
      }

      add(v) {
        this.x += v.x;
        this.y += v.y;
      }

      mult(m) {
        this.x *= m;
        this.y *= m;
      }

      div(m) {
        this.x /= m;
        this.y /= m;
      }

      mag() {
        return Math.hypot(this.x, this.y);
      }

      setMag(m) {
        this.normalize();
        this.mult(m);
      }

      normalize() {
        this.div(this.mag());
      }

      dot(v) {
        return this.x * v.x + this.y * v.y;
      }

      // return projection of v onto vector
      proj(v) {
        const temp = this.copy();
        temp.normalize();
        temp.mult(this.dot(v) / this.mag());
        return temp;
      }

      copy() {
        return new Vector(this.x, this.y);
      }

      static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
      }

      static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
      }
    }

    /* Ball Class */
    class Ball {
      constructor(x, y, color, radius) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(
          (0.5 - Math.random()) * 3,
          (0.5 - Math.random()) * 3,
        );
        this.radius = radius; // 랜덤하게 할당된 반지름
        this.mass = radius; // 공의 질량을 크기에 비례하게 설정
        this.accel = new Vector(0, 0);
        this.color = color;
      }

      update() {
        this.pos.add(this.vel);
        this.vel.add(this.accel);
      }

      display() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      // split from another ball
      split(b2) {
        const pushFactor = Vector.sub(b2.pos, this.pos);
        pushFactor.setMag((this.radius + b2.radius - pushFactor.mag()) / 2);
        b2.pos.add(pushFactor);
        this.pos.sub(pushFactor);
      }

      // detect collision
      static hasCollided(b1, b2) {
        return circCollide(
          b1.pos.x,
          b1.pos.y,
          b1.radius,
          b2.pos.x,
          b2.pos.y,
          b2.radius,
        );
      }

      // handle collision
      collide(b2) {
        if (Ball.hasCollided(this, b2)) {
          // split balls
          this.split(b2);

          // bounce
          const temp1 = Vector.sub(this.pos, b2.pos).proj(
            Vector.sub(this.vel, b2.vel),
          );
          temp1.mult((2 * b2.mass) / (this.mass + b2.mass));
          const temp2 = Vector.sub(b2.pos, this.pos).proj(
            Vector.sub(b2.vel, this.vel),
          );
          temp2.mult((2 * this.mass) / (this.mass + b2.mass));
          this.vel.sub(temp1);
          b2.vel.sub(temp2);
        }
      }
    }

    function circCollide(x1, y1, r1, x2, y2, r2) {
      return Math.hypot(x2 - x1, y2 - y1) < r1 + r2;
    }

    // handle balls colliding with wall
    function wallCollide(b1) {
      // check 4 edges
      if (b1.pos.x + b1.radius > canvas.width) {
        b1.pos.x = canvas.width - b1.radius;
        b1.vel.x *= -1;
      }

      if (b1.pos.x - b1.radius < 0) {
        b1.pos.x = b1.radius;
        b1.vel.x *= -1;
      }

      if (b1.pos.y + b1.radius > canvas.height) {
        b1.pos.y = canvas.height - b1.radius;
        b1.vel.y *= -1;
      }

      if (b1.pos.y - b1.radius < 0) {
        b1.pos.y = b1.radius;
        b1.vel.y *= -1;
      }
    }

    const balls = [];

    // Use the specified colors
    const colors = [
      "#8797CA",
      "#E5808E",
      "#FDB78C",
      "#D4E9D8",
      "#E2D4E9",
      "#F1D691",
    ];

    // create balls with random sizes
    for (let i = 0; i < colors.length; i++) {
      const radius = 20 + Math.random() * 220; // 공 크기를 20 ~ 120 사이로 랜덤 설정
      balls.push(
        new Ball(
          20 + Math.random() * (canvas.width - 40),
          20 + Math.random() * (canvas.height - 40),
          colors[i], // Assign color from the specified list
          radius,
        ),
      );
    }

    // split balls up
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        if (Ball.hasCollided(balls[i], balls[j])) {
          balls[i].split(balls[j]);
        }
      }
    }

    // update program
    function update(progress) {
      for (let i = 0; i < balls.length; i++) {
        balls[i].update(); // move ball
      }

      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          balls[i].collide(balls[j]); // collide with other balls
        }
      }

      for (let i = 0; i < balls.length; i++) {
        wallCollide(balls[i]); // collide with wall
      }
    }

    // draw everything
    function draw() {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < balls.length; i++) {
        balls[i].display();
      }
    }

    // loop
    function loop(timestamp) {
      const progress = timestamp - lastRender;

      update(progress);
      draw();

      lastRender = timestamp;
      window.requestAnimationFrame(loop);
    }

    let lastRender = 0;
    window.requestAnimationFrame(loop);

    return () => window.removeEventListener("resize", resizeCanvas); // Cleanup event listener on unmount
  }, []);

  return (
    <div className="bg-main relative flex h-full w-full flex-col items-center justify-center">
      <canvas className="bg-main" ref={canvasRef}></canvas>
      <div className="absolute bottom-[200px] flex w-full flex-col items-center">
        <span className="font-noto text-[30px] font-semibold text-[#424242]">
          사람의 목소리는 다양한 주파수와 진폭이 결합되어, 서로 다른 개성을 가진
          소리를 만들어내요.
        </span>
      </div>
    </div>
  );
}

export default Loading;
