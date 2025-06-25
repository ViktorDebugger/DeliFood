import React from "react";
import { Link } from "react-router-dom";
import { useBackgroundColor } from "../hooks/useBackgroundColor.jsx";
import { useTitle } from "../hooks/useTitle.jsx";
import image01 from "/home/image-1.png";
import image02 from "/home/image-2.png";
import image03 from "/home/image-3.png";

const Home = () => {
  useBackgroundColor("bg-red-500");
  useTitle("Головна");

  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-black rounded-lg" data-aos="zoom-in">
      <section className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-black dark:text-white">
            Ласкаво просимо до Delifood
          </h1>
          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
            Смачні страви з доставкою прямо до вашого дому. Обирайте свої
            улюблені делікатеси та насолоджуйтесь швидкою доставкою.
          </p>
          <Link
            to="/menu"
            className="inline-block bg-green-500 hover:bg-green-600 text-white dark:text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            Переглянути меню
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="text-center flex flex-col items-center">
            <figure className="w-32 h-32 mb-4">
              <img
                src={image01}
                alt="Image 1"
                className="object-cover object-center"
              />
            </figure>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Швидка доставка
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Отримайте ваше замовлення менш ніж за 30 хвилин.
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <figure className="w-32 h-32 mb-4">
              <img
                src={image02}
                alt="Image 2"
                className="object-cover object-center"
              />
            </figure>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Якісні інгредієнти
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Ми використовуємо тільки свіжі та перевірені продукти.
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <figure className="w-32 h-32 mb-4">
              <img
                src={image03}
                alt="Image 3"
                className="object-cover object-center"
              />
            </figure>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Зручне замовлення
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Замовляйте онлайн в декілька кліків з будь-якого пристрою.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
