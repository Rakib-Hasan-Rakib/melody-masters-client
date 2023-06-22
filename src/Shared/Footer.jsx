import React from 'react';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import facebookIcon from '../assets/images/logos/facebook-icon.png'
import instagramIcon from "../assets/images/logos/instagram-icon.png";
import youtubeIcon from "../assets/images/logos/youtube-icon.png";

const Footer = () => {
    const year = new Date().getFullYear()
    return (
      <>
        <div className="bg-gray-900 text-white">
          <div className="md:grid md:grid-cols-4 gap-6 py-8 w-11/12 mx-auto">
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-center text-3xl font-bold">MelodyMasters</h1>
            </div>
            <div className="flex justify-around col-span-2">
              <div className="space-y-1 md:space-y-3">
                <h2 className="text-xl md:text-2xl">Contact Us</h2>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-orange-500" />
                  <span>+8801865215782</span>
                </div>
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="h-4 w-4 text-orange-500" />
                  <span>rakibhasanrakib3006@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-orange-500" />
                  <span>Mirpur-12, Dhaka</span>
                </div>
              </div>
            </div>
            <div className="my-6 md:my-0">
              <h2 className="text-xl md:text-2xl text-center md:text-start">
                Follow Us
              </h2>
              <div className="flex justify-center md:justify-start items-center gap-4 my-2 md:my-8">
                <img
                  className="w-8 cursor-pointer"
                  src={facebookIcon}
                  alt="facebookIcon"
                />

                <img
                  className="w-8 cursor-pointer"
                  src={instagramIcon}
                  alt="instagramIcon"
                />
                <img
                  className="w-10 cursor-pointer"
                  src={youtubeIcon}
                  alt="youtubeIcon"
                />
              </div>
            </div>
          </div>
          <hr className="w-11/12 mx-auto" />
          <p className="text-center text-sm py-4">
            <span className="text-orange-500">&#169;</span>
            {year} MelodyMasters all rights reserved.
          </p>
        </div>
      </>
    );
};

export default Footer;