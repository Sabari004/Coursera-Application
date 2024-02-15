// import gsap from "gsap";
// import { ScrollTrigger, Power2 } from "gsap/all";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, Power2 } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1505440484611-23c171ad6e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1454&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505440484611-23c171ad6e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1454&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505440484611-23c171ad6e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1454&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505440484611-23c171ad6e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1454&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505440484611-23c171ad6e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1454&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505440484611-23c171ad6e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1454&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505440484611-23c171ad6e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1454&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505440484611-23c171ad6e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1454&q=80",
  },
];

export default function SUmm() {
  const ref1 = useRef(null);
  const itemsRef = useRef([]);
  itemsRef.current = [];

  useEffect(() => {
    // console.log(ref1.current);

    gsap.fromTo(
      ref1.current,
      {
        opacity: 0,
        // y: 50,
        ease: Power2,
        clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
      },
      {
        opacity: 1,
        // y: 0,
        duration: 0.5,
        delay: 1,
        ease: Power2,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }
    );

    itemsRef.current.map((item, index) => {
      gsap.fromTo(
        item,
        {
          autoAlpha: 0,
          // y: 20,
          scale: 1.5,
          ease: Power2,
          clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
        },
        {
          // y: 0,
          duration: 0.5,
          autoAlpha: 1,
          scale: 1,
          ease: Power2,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scrollTrigger: {
            trigger: item,
            start: "top center+=100",
            toggleActions: "play none none reverse",
            markers: true,
          },
        }
      );
    });
  }, [ref1, itemsRef]);

  const addToRefs = (item) => {
    if (item) {
      itemsRef.current.push(item);
    }
  };

  return (
    <div class="main-container">
      <div className="box1" ref={ref1}>
        <img src={data[0].image} alt="" className="image" />
      </div>

      {data.map(({ image }, index) => {
        return (
          <div class="image-container" key={index}>
            <img src={image} alt="" className="image" ref={addToRefs} />
          </div>
        );
      })}
      <div className="box2" />
    </div>
  );
}
