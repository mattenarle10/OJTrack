'use client';

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Head from "next/head";
import { motion } from "framer-motion";
import "../styles/globals.css";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>OJTrack - Internship Journal</title>
      </Head>
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-8 ">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl space-y-16 md:space-y-0">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:w-1/2 text-center md:text-left"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl font-extrabold mb-4 text-gray-800 leading-tight"
            >
              Start Tracking Your <span className="text-orange-500">Internship Journey</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-gray-600 mb-6 text-lg"
            >
              Track your progress, generate reports, and stay on top of your internship tasks with
              ease.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Right Side Image Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:w-1/2 mt-120 md:mt-0 flex justify-center"
          >
            <motion.img
              src="/images/Logo2-OJTrack.png"
              alt="OJTrack Logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-full max-h-[700px] md:max-h-[800px] object-contain"
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
