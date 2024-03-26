import React from "react";
import { useRef, useLayoutEffect } from "react";
import { useGLTF, useScroll, Backdrop, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Room } from "./Room";
const LandModel = () => {
  const model = useRef();
  const scroll = useScroll();
  const tl = useRef();

  useFrame((state, delta) => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      defaults: { duration: 2, ease: "power1.inOut" },
    });

    tl.current
      // .to(model.current.rotation, { y: -1 }, 0)
      // .to(model.current.position, { y: -1 }, 0)

      .to(model.current.rotation, { y: 1 }, 2)
      .to(model.current.position, { x: 2 }, 2)

      .to(model.current.rotation, { y: 1 }, 6)
      .to(model.current.position, { x: -2 }, 6)

      .to(model.current.rotation, { y: 0 }, 11)
      .to(model.current.rotation, { x: 1 }, 11)
      .to(model.current.position, { x: 0 }, 11)

      .to(model.current.rotation, { y: 2 }, 13)
      .to(model.current.rotation, { x: 1 }, 13)
      .to(model.current.position, { z: 1 }, 13)

      // .to(model.current.rotation, { y: 0 }, 16)
      // .to(model.current.rotation, { x: 0 }, 16)
      // .to(model.current.position, { x: 0 }, 16)
      .to(model.current.position, { z: 2 }, 16)

      // .to(model.current.rotation, { y: 0 }, 20)
      // .to(model.current.rotation, { x: 0 }, 20)
      .to(model.current.position, { z: 3 }, 20);
  }, []);

  return (
    <mesh ref={model} position={[0, -1.5, 0]}>
      <ambientLight />
      <Room />
    </mesh>
  );
};

export default LandModel;
