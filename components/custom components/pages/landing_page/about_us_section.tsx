import React from 'react';

const AboutUsSection = () => {
  const card_styles = "text-2xl text-black p-6 border-1 border-gray-300 rounded-lg bg-gray-50";
  return (
    <div className="bg-white p-10 font-sans mx-10">
      <p className="uppercase text-sm text-black mb-5">About Us</p>
      
      <div className="grid md:grid-cols-2 items-start mb-10  gap-4">
        <div className="flex-1 mr-10">
          <h1 className="text-4xl font-bold text-black mb-5">A Legacy of Excellence</h1>
          
          <p className="text-lg text-gray-600 mb-10">
            Our story is a testament to the power of collaboration and resilience. Together, we have navigated challenges, celebrated milestones, and crafted a narrative of growth and achievement in the meat industry.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div className={card_styles }>
              <h3 className="text-2xl font-bold text-black">5+ Years</h3>
              <p className="text-sm text-gray-600">Supplying premium meat products with quality and care.</p>
            </div>
            
            <div className={card_styles}>
              <h3 className="text-2xl font-bold text-black">100+ Deliveries Weekly</h3>
              <p className="text-sm text-gray-600">Delivered precisely with quality commitment.</p>
            </div>
            
            <div className={card_styles}>
              <h3 className="text-2xl font-bold text-black">20+ Awards</h3>
              <p className="text-sm text-gray-600">Recognizing our innovation and dedication.</p>
            </div>
            
            <div className={card_styles}>
              <h3 className="text-2xl font-bold text-black">99% Success</h3>
              <p className="text-sm text-gray-600">Showing our commitment to client satisfaction.</p>
            </div>
          </div>
          
          <button className="bg-black text-white px-5 py-2.5 rounded font-base hover:bg-red-600 hover:pl-6 transition-all duration:300 cursor-pointer">Read more →</button>
        </div>
        
        <div className="hidden md:block bg-gray-200 rounded-lg flex-1 h-100 md:h-[750px] overflow-hidden bg-[url('https://www.svgheart.com/product/cow-face-animal-wildlife-svg-file/?srsltid=AfmBOorF1W0vJiUgXfFRvXAljnPN71TqpKvLL5XTQjuYbbEuloKhPlcl')])">
         <img src="https://ik.imagekit.io/ypgvaedes/Quicksave/Aesthetic_Photos/Landing%20Page%20Image%202.webp" alt="Assorted premium meats displayed on a tray" className='object-contain w-full h-full' />
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-gray-100 rounded-lg p-5 text-left">
          <h4 className="text-lg font-bold text-black mb-2.5">○ Why Choose Us?</h4>
          <p className="text-sm text-gray-600">We provide premium, fresh meat products sourced from trusted farms, ensuring quality and safety in every cut.</p>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-5 text-left">
          <h4 className="text-lg font-bold text-black mb-2.5">○ Our Vision</h4>
          <p className="text-sm text-gray-600">To be the leading provider of sustainable and high-quality meat products, fostering healthy communities through exceptional food.</p>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-5 text-left">
          <h4 className="text-lg font-bold text-black mb-2.5">○ Our Team</h4>
          <p className="text-sm text-gray-600">Our team of meat industry experts is dedicated to exceptional results and outstanding customer service.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;