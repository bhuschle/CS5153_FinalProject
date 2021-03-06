CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    image1_path VARCHAR(1000),
    alt1_text VARCHAR(200),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    brand VARCHAR(100),
    color VARCHAR(20),
    model_number VARCHAR(100),
    sold_count INT,
    product_description TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    user_address VARCHAR(100),
    user_city VARCHAR(50),
    user_state VARCHAR(50),
    user_country VARCHAR(50),
    user_zip_code VARCHAR(5),
    card_name VARCHAR(200),
    card_number VARCHAR(19),
    card_expiration_date VARCHAR(7),
    card_cvv_code VARCHAR(3),
    card_zip_code VARCHAR(5),
    PRIMARY KEY(id)
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    user_id_ INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE order_items (
    id INT NOT NULL AUTO_INCREMENT,
    order_name VARCHAR(100) NOT NULL,
    order_price DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY(id)
);


INSERT INTO products (product_name, brand, category, subcategory, price, image1_path, alt1_text, color, model_number, product_description, sold_count) VALUES
("Kindle Paperwhite", "Amazon", "computers", "tablets", 59.99, "/prodImg/computers/tablets/kindle.jpg", "Picture of Kindle Paperwhite", "black", "KPW11", "Kindle Paperwhite (8 GB) - Now with a 6.8 inch display and adjustable warm light - Ad-Supported", 16),
("2021 iPad 10.2 inch", "Apple", "computers", "tablets", 429.99, "/prodImg/computers/tablets/ipad.jpg", "Picture of Apple iPad ten point two inch silver", "silver ", "B09G9CJM1Z", "Gorgeous 10.2-inch Retina display with True Tone A13 Bionic chip with Neural Engine 8MP Wide back camera, 12MP Ultra Wide front camera with Center Stage", 92),
("Samsung Galaxy Tab A8 10.5 inch", "Samsung", "computers", "tablets", 229.99, "/prodImg/computers/tablets/samsung.jpg", "Picture of ten point five inch samsung galaxy tab A eight", "silver ", "SM-X200NZSAXAR", "Whether your family is streaming or video chatting with friends, the Galaxy Tab A8 tablet brings out the best in every moment on a 10.5 inch LCD screen", 26),
("2021 Macbook Pro 14 inch", "Apple", "computers", "laptops", 1999.00, "/prodImg/computers/laptops/macbook.jpg", "Picture of fourteen inch twenty twenty-one macbook pro", "space grey", "MKGT3LL/A", "Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU, and machine learning performance Up to 10-core CPU delivers up to 3.7x faster performance to fly through pro workflows quicker than ever. Up to 32-core GPU with up to 13x faster performance for graphics-intensive apps and games 16-core Neural Engine for up to 11x faster machine learning performance.", 23),
("Galaxy Book Pro", "Samsung", "computers", "laptops", 1159.00, "/prodImg/computers/laptops/samsung.jpg", "Picture of Samsung Galaxy Book Pro", "mystic blue", "NP950XDB-KC3US", "The First 13.3 inch/15.6??? Amoled Screen In A Galaxy Book; Enjoy Vibrant Viewing While You Work Or School Inside Or In Direct Sunlight, And It Lessens Eye Strain By Reducing Harmful Blue Light", 83),
("Pixelbook Pro", "Google", "computers", "laptops", 997.86, "/prodImg/computers/laptops/google.jpg", "Picture of Google Pixelbook Pro", "black", "GA00523-US", "Pixelbook Go starts up in seconds and makes working a breeze. The 8th Gen Intel Core Processor is quick and responsive powering everything you do. And Chrome OS doesn't slow down over time so it always feels like new.", 75),
("XPS 13", "Dell", "computers", "laptops", 1692.99, "/prodImg/computers/laptops/dell.jpg", "Picture of Dell XPS 13", "silver ", "XPS9310-7422SLV-PUS", "The XPS 9310 thin laptop is built with Wi-Fi 6 techology, the AX1650 prioritizes streaming video, communication, and game traffic in your system for fast, smooth online experiences", 44),
("ThinkPad X1 Carbon", "Lenovo", "computers", "laptops", 1780.00, "/prodImg/computers/laptops/lenovo.jpg", "Picture of Lenovo Thinkpad X one carbon", "black", "20U9005MUS", "Tested against 12 military-grade requirements from the Arctic wilderness to desert dust storms, from zero gravity to spills and drops, you can trust this laptop to handle whatever life throws your way.", 25),
("Halo 2.0", "TJJ", "computers", "desktops", 1199.00, "/prodImg/computers/desktops/tjj.jpg", "Picture of TJJ Halo two point zero gaming desktop", "black", "TJJHALO2.0", "This powerful gaming PC is capable of running all your favorite games at High to Ultra settings, crisp 1080p FHD resolution and smooth 60+ FPS game play.", 19),
("Nitro 50", "Acer", "computers", "desktops", 829.99, "/prodImg/computers/desktops/acer.jpg", "Picture of Acer Nitro fifty desktop computer", "black", "DG.E2HAA.004", "Upgrade rollout plan is being finalized and is scheduled to begin late in 2021 and continue into 2022. Specific timing will vary by device. Certain features require specific hardware", 47),
("Gamer Xtreme VR", "CYBERRPOWERPC", "computers", "desktops", 1199.99, "/prodImg/computers/desktops/cppc.jpg", "Picture of Cyber Power Pc Gamer Extreme Virtual Reality Desktop", "black", "GXiVR8480A11", "Intel Core i5-11600KF 3.9GHz 6-Core | Intel B560 Chipset | 16GB DDR4 | 500GB PCI-E NVMe SSD | 1TB HDD | Genuine Windows 11 Home 64-bit", 64),
("Aurora A13", "Alienware", "computers", "desktops", 2429.09, "/prodImg/computers/desktops/alien.jpg", "Picture of Alienware Aurora A thirteen Desktop", "white", "AWAUR13-7726WHT-PUS", "Introducing our first Alienware Cryo-tech enabled gaming desktop. Featuring a larger, evolved chassis for enhanced airflow and quieter performance.", 44),
("Blacklight - Blu-ray/DVD", "New Releases", "moviemusic", "movies", 24.99, "/prodImg/moviemusic/movies/Blacklight_1.jpg", "Picture of Blacklight DVD ", NULL, NULL, "It includes a Blu-ray/DVD - An action film following covert government operative Travis Block.", 71),
("The Outfit - Blu-ray", "New Releases", "moviemusic", "movies", 24.99, "/prodImg/moviemusic/movies/TheOutfit_1.jpg", "Picture of The Outfit DVD", NULL, NULL, "It includes a digital copy, Blu-ray. It is a crime drama movie released in 2022 and runs for 105 minutes", 28),
("Turning Red - Blu-ray/DVD", "New Releases", "moviemusic", "movies", 24.99, "/prodImg/moviemusic/movies/TurningRed_1.jpg", "Picture of Turning Red DVD", NULL, NULL, "It includes a Digital Copy, 4K Ultra HD Blu-ray. It is a comedy, animated Walt Disney movie released in 2022", 25),
("Dinosaur World - Blu-ray", "New Releases", "moviemusic", "movies", 17.99, "/prodImg/moviemusic/movies/DinosaurWorld_1.jpg", "Picture of Dinosaur World DVD", NULL, NULL, "It is a Blu-ray format. In this movie, the best players from around the world are gathered to be lab rats in a new game", 78),
("Ocean's 8 - SteelBook", "Steelbook", "moviemusic", "movies", 22.99, "/prodImg/moviemusic/movies/Oceans8_1.jpg", "Picture of Oceans 8 Steelbook", NULL, NULL, "This includes a steelbook, 4K HD Blu-ray. It is a action/comedy movie released in 2018", 2),
("Wonder Woman 1984 - SteelBook", "Steelbook", "moviemusic", "movies", 27.99, "/prodImg/moviemusic/movies/WonderWoman_1.jpg", "Picture of Wonder Woman 1984 Steelbook", NULL, NULL, "It includes a SteelBook, Digital Copy, 4K Ultra HD Blu-ray. This fantasy, super-hero movie was released in 2020", 79),
("The Hunger Games: SteelBook Collection", "Steelbook", "moviemusic", "movies", 89.99, "/prodImg/moviemusic/movies/TheHungerGames_1.jpg", "Picture of The Hunger Games CD", NULL, NULL, "The ultimate SteelBook collection, Digital Copy, 4K Ultra HD Blu-ray format", 30),
("100 Songs Latin", "International music", "moviemusic", "music", 19.99, "/prodImg/moviemusic/music/100SongsLatin_1.jpg", "Picture of 100 Songs CD cover", NULL, NULL, "Brazilian music, Bossa nova, Latin dance music, salsa, bachata, merengue, Kizomba & Latin jazz [4CD]", 97),
("Best of Caribbean Music", "International music", "moviemusic", "music", 14.99, "/prodImg/moviemusic/music/BestOfCarribeanMusic_1.jpg", "Picture of Best of Carribean Music CD ", NULL, NULL, "From steel pan music to calypso, and from merengue to salsa and Latin-jazz, feel the irresistibly danceable rhythms of these feel-good songs from around the Caribbean.", 90),
("Fred Astaire: Songs From the Movies 1930s & 40s", "International music", "moviemusic", "music", 16.00, "/prodImg/moviemusic/music/FredAstaire_1.jpg", "Picture of Fred Astaire CD ", NULL, NULL, "This CD features 25 wonderful songs from Fred Astaire's greatest movies. Astaire introduced more great classic songs than any other performer.", 57),
("Scottish Top 20 Songs", "International music", "moviemusic", "music", 13.99, "/prodImg/moviemusic/music/ScottishTop20Songs_1.jpg", "Picture of Scottish Top 20 Songs ", NULL, NULL, "A compilation of the most popular songs from Scotland's traditional folk made popular worldwide by Scottish music ambassadors!", 6),
("Beethoven: Complete Piano Concertos", "Classical", "moviemusic", "music", 94.47, "/prodImg/moviemusic/music/BeethovenPianoConcert_1.jpg", "Picture of Beethoven Piano Concert CD", NULL, NULL, "Beethoven: Piano Concertos is available in a limited release that includes three SA-CD discs, one Blu-ray audio disc, and one Blu-ray video disc", 37),
("Mahler: 10 Symphonies", "Classical", "moviemusic", "music", 43.65, "/prodImg/moviemusic/music/Mahler_1.jpg", "Picture of Mahler 10 Symphonies ", NULL, NULL, "Half a century after release, Rafael Kubel??k's recordings of Mahler's symphonies still remain reference recordings of the repertoire", 55),
("Verdi: Macbeth", "Classical", "moviemusic", "music", 31.49, "/prodImg/moviemusic/music/VerdiMacbeth_1.jpg", "Picture of Verdi Macbeth CD", NULL, NULL, "2-CDs + Blu-ray Audio disc deluxe hardback edition presenting Claudio Abbado's glorious 1976 recording of Verdi's Macbeth", 73),
("iPhone XR, 64GB", "Apple", "cellphones", "iphone", 248.00, "/prodImg/phones/iphone/iphonexr_1.jpg", "Picture of the front of a black iPhone XR", "black", "A1984", "With the iPhone XR you get a roomy 6.1-inch display, fast enough performance from Apple's A12 Bionic processor and good camera quality in a colorful design and affordable package. Apple has included the all-new Liquid Retina LCD as the display on the iPhone XR.", 90),
("iPhone XS, 64GB", "Apple", "cellphones", "iphone", 299.98, "/prodImg/phones/iphone/iphonexs_1.jpg", "Picture of the back of a black iPhone XS", "black", "MTA02LL/A", "A Super Retina OLED display. Even faster Face ID. And a breakthrough dual-camera system. The iPhone XS is everything you love about iPhone. Taken to the extreme.", 55),
("iPhone 11 Pro, 64GB", "Apple", "cellphones", "iphone", 428.57, "/prodImg/phones/iphone/iphone11pro_2.jpg", "Picture of the front of a black iPhone 11 Pro", "black", "A2160", "Shoot amazing videos and photos with the Ultra Wide, Wide, and Telephoto cameras. Capture your best low-light photos with Night mode. Watch HDR movies and shows on the Super Retina XDR display???the brightest iPhone display yet.", 90),
("iPhone 12 Mini, 128GB", "Apple", "cellphones", "iphone", 472.97, "/prodImg/phones/iphone/iphone12mini_1.jpg", "Picture of the front of a blue iPhone 12 Mini", "blue", "A1954", "iPhone 12 mini delivers an advanced 5G experience on a global scale, engineered with a seamless integration of world-class hardware and world-class software. ", 42),
("iPhone 11 Pro Max, 64GB", "Apple", "cellphones", "iphone", 528.96, "/prodImg/phones/iphone/iphone11promax_1.jpg", "Picture of the front of a black iPhone 11 Pro Max", "black", "MWGF2LL/A ", "The iPhone 11 Pro Max display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. ", 20),
("iPhone 13, 128GB", "Apple", "cellphones", "iphone", 773.97, "/prodImg/phones/iphone/iphone13_1.jpg", "Picture of the front of a blue iPhone 13", "blue", "MWAF2LL/A ", "Your new superpower. A superbright display in a durable design. Hollywood-worthy video shooting made easy. A lightning-fast chip. And a big boost in battery life you'll notice every day.", 73),
("iPhone 7, 32GB", "Apple", "cellphones", "iphone", 128.00, "/prodImg/phones/iphone/iphone7_1.jpg", "Picture of the front of a black iPhone 7", "black", "A1660", "Phone 7 dramatically improves the most important aspects of the iPhone experience. It introduces advanced new camera systems. The best performance and battery life ever in an iPhone.", 57),
("Galaxy S22, 128GB", "Samsung", "cellphones", "samsung", 699.99, "/prodImg/phones/samsung/galaxys22_1.jpg", "Picture of the front of a green Galaxy S22", "green", "SM-S901UZGAXAA ", "For Gen Z, video isn't just video. They think of it as a lifestyle - a universal language for how they learn, grow, express, talk, shop, connect, create, and fight boredom with their friends in real time. ", 17),
("Galaxy S21, 128GB", "Samsung", "cellphones", "samsung", 599.99, "/prodImg/phones/samsung/galaxys21_1.jpg", "Picture of the front of a white Galaxy S21", "white", "SM-G990UZWDXAA ", "Take your everyday experiences to the next level with the phone that's designed to fuel the passions of every fan. Whether you're a gaming guru, social star or fashionista, Samsung Galaxy S21 FE 5G is jam-packed with features.", 36),
("Galaxy S10+, 128GB", "Samsung", "cellphones", "samsung", 252.50, "/prodImg/phones/samsung/galaxys10_1.jpg", "Picture of the front of a black Galaxy S10 plus", "black", "B07PFL29FR ", "As the Galaxy S10, the Samsung Galaxy S10+ comes with a powerful Snapdragon 855 chip, a glass-and-metal construction, and a fingerprint reader built inside the display.", 35),
("Galaxy A12, 128GB", "Samsung", "cellphones", "samsung", 171.96, "/prodImg/phones/samsung/galaxya12_1.jpg", "Picture of the front of a black Galaxy A12", "black", "SM-A125FZKHXSP", "Expand your view to the 6.5-inch Infinity-V Display of Galaxy A12 and see what you've been missing. Thanks to HD+ technology, your everyday content looks sharp, crisp and clear.", 38),
("Galaxy A52, 128GB", "Samsung", "cellphones", "samsung", 274.99, "/prodImg/phones/samsung/galaxya52_1.jpg", "Picture of the front of a black Galaxy A52", "black", "A525F", "Behold the comfortable, sleek curves on Galaxy A52's seamless design. The minimal camera housing blends in with the matte finish on the rear for an iconic, almost unibody look. Express your style with four trendsetting colors: Awesome Violet, Awesome Black, and Awesome White.", 18),
("Galaxy Z Flip 3,128GB ", "Samsung", "cellphones", "samsung", 899.98, "/prodImg/phones/samsung/galaxyzflip3_1.jpg", "Picture of the front of a black Galaxy Z Flip 3", "black", "SM-F711UZGAXAA ", "The Samsung Galaxy Z Flip3 5G cell phone gives you the freedom to capture from any angle. Make hands-free video calls and take photos by simply unfolding your Galaxy Z Flip3.", 37),
("Galaxy Z Fold 3, 256GB ", "Samsung", "cellphones", "samsung", 1399.99, "/prodImg/phones/samsung/galaxyzfold3_1.jpg", "Picture of the front of a black Galaxy Z Fold 3", "black", "SM-F926UZKAXAA", "See more and do more with the Samsung Galaxy Z Fold3 smart phone, that has the ultimate foldable screen putting a workspace, theater, and game room right in your pocket.", 14),
("EOS Rebel T7", "Canon", "cameras", "dslr", 479.00, "/prodImg/cameras/dslr/canoneosrebelt7_1.jpg", "Picture of a Canon EOS Rebel T7 camera", "black", "2727C002", "Perfect for beginners, this camera bundle offers the essential tools needed to take your SLR skills to new heights, all in one convenient package.", 55),
("LUMIX G7", "Panasonic", "cameras", "dslr", 597.99, "/prodImg/cameras/dslr/panasoniclumixg7_1.jpg", "Picture of a Panasonic Lumix G7 camera", "black", "DMC-G7KK", "The professional grade Panasonic Lumix 4K Digital Camera DMC G7KK accepts over 24 compact lens options built on the next generation interchangeable lens camera (ILC) standard (Micro Four Thirds) pioneered by Panasonic.", 20),        
("LUMIX FZ80", "Panasonic", "cameras", "dslr", 297.99, "/prodImg/cameras/dslr/panasoniclumixfz80_1.jpg", "Picture of a Panasonic Lumix FZ80 camera", "black", "DC-FZ80K", "Perfect for travelers, the Panasonic Lumix Digital Camera DC FZ80K brings the legendary optical performance of a super long 60X (20 1200mm) DC Vario lens with amazingly stable O.I.S. (Optical Image Stabilizer) to a highly portable point and shoot travel camera.", 18),
("EOS Rebel SL3", "Canon", "cameras", "dslr", 749.00, "/prodImg/cameras/dslr/canoneosrebelsl3_1.jpg", "Picture of a Canon EOS Rebel SL3 camera", "white", "3457C001", "Whether you're a first time SLR user, an aspiring photo enthusiast, or someone looking to capture those amazing family moments, The Canon EOS Rebel SL3 can be the perfect companion.", 93),
("OM-D E-M5 Mark III", "Olympus", "cameras", "dslr", 1399.99, "/prodImg/cameras/dslr/olympusomd_1.jpg", "Picture of an Olympus OM-D E-M5 Mark 3 camera", "silver", "V207091SU000", "The OM-D E-M5 Mark III is compact, lightweight and comfortable - made for roaming the biggest cities to the smallest villages and even the most remote destinations on earth.", 85),
("DSC-W800/B", "Sony", "cameras", "pointshoot", 199.00, "/prodImg/cameras/pointshoot/sonydsc_1.jpg", "Picture of a Sony DSC W800 camera", "black", "E1SNDSCW800B", "Easy Made Easier This incredibly easy-to-use camera slips right in your pocket, ready to capture a memory at a moment's notice.", 7),
("TG-6", "Olympus", "cameras", "pointshoot", 449.00, "/prodImg/cameras/pointshoot/olympustg6_1.jpg", "Picture of an Olympus Tough TG-6 camera", "red", "B07RC8HPHL", "You live for the outdoors. Hiking steep mountain trails. Backpacking through a desert Canyon. Skiing in the wilderness. The tough tg-6 is ready for adventure. It's built to endure all the extreme environments you love exploring.", 22),
("LUMIX ZS100", "Panasonic", "cameras", "pointshoot", 497.00, "/prodImg/cameras/pointshoot/panasoniclumixzs100_1.jpg", "Picture of a Panasonic Lumix ZS100 camera", "black", "DMC-ZS100K ", "Perfect for travelers, the Panasonic LUMIX Digital Camera DMC-ZS100K brings the legendary optical performance of a 10X (25-250mm) LEICA DC VARIO-ELMARIT lens with amazingly stable O.I.S. (Optical Image Stabilizer) to a highly portable point-and-shoot travel camera.", 25),
("LUMIX DC-ZS70S", "Panasonic", "cameras", "pointshoot", 397.99, "/prodImg/cameras/pointshoot/panasoniclumixdc_1.jpg", "Picture of a Panasonic LUMIX DC-ZS70S camera", "black", "DC-ZS70S", "Panasonic lumix point-and-shoot digital cameras are known among camera enthusiasts for reliability and innovative features.", 38),
("Mini Camera", "IEBRT", "cameras", "pointshoot", 53.99, "/prodImg/cameras/pointshoot/iebrtminicamera_1.jpg", "Picture of a IEBRT mini camera", "red", "B08DCL4S69", "The IEBRT digital camera is equipped with a mini digital camera with FHD1080P still pictures and 36MP high-resolution video.", 36);

INSERT INTO users (first_name, last_name, email, user_password, user_address, user_city, user_state, user_country, user_zip_code, card_name, card_number, card_expiration_date, card_cvv_code, card_zip_code) VALUES
(
    'Test',
    'User',
    'testuser@example.com',
    'testpassword',
    '99 Test Drive',
    'San Antonio',
    'TX',
    'USA',
    '99999',
    'Test User',
    '8888 8888 8888 8888',
    '08/2022',
    '999',
    '99999'
);
