'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';

const navVariants: Variants = {
  hidden: {
    y: 0.1,
  },
  visible: {
    y: 0,
    transition: {
      delay: 0.3,
      staggerChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

const navChildVariants: Variants = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.6,
    },
  },
};

const Nav = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { label: 'Get Started', href: '/auth' },
    { label: 'About', href: '/about' },
  ];

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="relative z-30 h-20 bg-white"
    >
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/Logo2-OJTrack.png"
            alt="OJTrack Logo"
            width={35}
            height={35}
            className="rounded"
          />
          <motion.span
            variants={navChildVariants}
            className="text-lg font-bold tracking-tight text-gray-900"
          >
            OJ<span className="text-orange-500">Track</span>
          </motion.span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-10">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              variants={navChildVariants}
              className="relative"
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-orange-500 transition"
              >
                {link.label}
              </Link>

              {hoveredLink === link.label && (
                <motion.div
                  layoutId="navlink-hover"
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-orange-500"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                ></motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
