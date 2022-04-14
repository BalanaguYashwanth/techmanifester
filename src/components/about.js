import React from 'react'
import Navbar from './navbar'
import image from './images/profile_update.jpeg'
import '../about.css'


export default function about() {
	return (
		<div>
			<Navbar />

			<section id="about">

				<div >
					<div className="col-twelve">

						<div style={{ marginLeft: 20, marginRight: 20 }} className="intro-info">

							<img id="profileimg" src={image} alt="Profile Picture" />
							<br />
							<br />
							<div className="lead">
								{"Hello People! I'm K P Ranjith here! I'm a full-time freelance Senior Android Trainer and Developer with 8 years of experience on Android Application Training and Development."}
								<br />
								{"  I have delivered multiple training programs on Android across the globe.Numerous Corporate trainings for top MNCs like Vodafone India, Sapient corporation, sify technologies, top government organization's like power grid, top government institutions like IITs, top private institutions like BITS Pilani. And lots of colleges across India. :flag-in: "}
								<br />
							</div>



						</div>

					</div>
				</div>
				<br />
				<div className=" about-content"  >

					<div>
						<ul className="info-list">
							<li>
								<strong>Profile:</strong>
								<span>Having 6 years of experience which is purely on Android.</span>
							</li>
							<li>
								<strong>My Life With Android </strong>
								<span>{"http://bit.ly/MyLifeWithAndroid"}</span>
							</li>
							<li>
								<strong>Fullname:</strong>
								<span>K P Ranjith Kumar</span>
							</li>
							<li>
								<strong>Birth Date:</strong>
								<span>October  2, 1989</span>
							</li>
							<li>
								<strong>Job:</strong>
								<span>Senior Android Developer & Trainer, Founder of AndroidManifester, Software Entrepreneur</span>
							</li>
							<li>
								<strong>Contact me</strong>
								<span>K.P. Ranjith,
								+91-8148580586,
								<br />
								Ranjithpsundar@gmail.com,
								<br />
								Software Entrepreneur,
								<br />
								https://g.co/kgs/gPGHKz
								<br />
								www.AndroidManifester.com,
								<br />
								FB.com/AndroidManifester
								</span>
							</li>
						</ul>
					</div>
				</div>

			</section>

		</div>
	)

}