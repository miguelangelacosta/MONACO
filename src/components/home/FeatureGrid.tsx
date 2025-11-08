import { useEffect, useRef, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { FaHammer } from "react-icons/fa6";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { MdLocalShipping } from "react-icons/md";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * FeatureGrid (robusto)
 * - Muestra un skeleton mientras se inicializa.
 * - Forza recalculo del slider en mount y resize.
 */

export const FeatureGrid = () => {
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef<Slider | null>(null);

  // Features
  const features = [
    {
      icon: <MdLocalShipping size={40} className="text-yellow-600" />,
      title: "Envíos Rápidos y Seguros",
      description:
        "Recibe tus productos en todo el país con entregas seguras y seguimiento en tiempo real.",
    },
    {
      icon: <HiMiniReceiptRefund size={40} className="text-yellow-600" />,
      title: "Garantía y Devoluciones",
      description:
        "Compra sin preocupaciones: ofrecemos reemplazos o devoluciones por defectos de fábrica.",
    },
    {
      icon: <FaHammer size={40} className="text-yellow-600" />,
      title: "Soporte Técnico 24/7",
      description:
        "Nuestro equipo de asistencia está disponible en todo momento para ayudarte.",
    },
    {
      icon: <BiWorld size={40} className="text-yellow-600" />,
      title: "Cobertura Global",
      description:
        "Ofrecemos garantía internacional y respaldo en cada uno de nuestros productos.",
    },
  ];

  // Settings react-slick
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // Montaje: esperar al primer frame para asegurarse de que el layout esté listo
  useEffect(() => {
    let rafId: number | null = null;
    // pequeña espera para que el DOM y CSS se apliquen
    rafId = window.requestAnimationFrame(() => {
      // un timeout corto ayuda con fast-refresh en dev
      const t = setTimeout(() => {
        setMounted(true);
        clearTimeout(t);
      }, 50);
    });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Forzar recalculo del slider al montarse y al cambiar tamaño
  useEffect(() => {
    if (!mounted) return;

const handleRecalc = () => {
  try {
    const slider = sliderRef.current as any;
    if (slider?.innerSlider && typeof slider.innerSlider.onWindowResized === "function") {
      // Forzar recalculo interno
      slider.innerSlider.onWindowResized();
    } else if (typeof slider?.slickGoTo === "function") {
      // Fallback: ir a la primera slide
      slider.slickGoTo(0);
    }
  } catch (err) {
    // Evita romper el flujo si algo falla
    console.warn("Error recalculando slider:", err);
  }
};


    // recalcula una vez al montarse
    handleRecalc();

    // y al hacer resize (throttle simple)
    let resizeTimer: number | null = null;
    const onResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        handleRecalc();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [mounted]);

  return (
    <section className="my-24 px-4 sm:px-8 lg:px-12 bg-gradient-to-r from-gray-50 via-white to-gray-50 py-16 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14 text-gray-900 tracking-tight">
        ¿Por qué elegir MONACO?
      </h2>

      {/* Skeleton / placeholder mientras se monta */}
      {!mounted ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {features.map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-3xl p-8 animate-pulse h-44"
            />
          ))}
        </div>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {features.map((feature, index) => (
            <div key={index} className="px-4">
              <div className="bg-white border border-gray-100 rounded-3xl flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-in-out p-10">
                <div className="mb-4">{feature.icon}</div>
                <p className="font-semibold text-gray-900 text-lg mb-2">
                  {feature.title}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};
