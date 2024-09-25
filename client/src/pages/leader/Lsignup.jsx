import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
import im from '../../assets/religion/Rectangle 6.png'
import im1 from '../../assets/religion/Rectangle 7.png'
import im2 from '../../assets/religion/Rectangle 8.png'
import im3 from '../../assets/religion/Rectangle 9.png'
import { Link, useNavigate } from 'react-router-dom';
const Lsignup = () => {
    const [formData, setFormData] = useState({
        title: '',
        firstname: '',
        lastname: '',
        ministryname: '',
        email: '',
        password: '',
        bio: '',
        religion: '',
        category: '',
        country: 'Nigeria',
        state: '',
        localGovtArea: '',
        address: '',
        yearsInProfession: '',
        accountNumber: '',
        accountName: '',
        bankName: '',
        refereephone: '',
        relationship: '',
        refereename: '',
        refereeemail: '',
        profilePicture: '',
    });

    const [localGovtOptions, setLocalGovtOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [states, setStates] = useState([]);
    const [banks, setBanks] = useState([]);
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const nigeriaStatesAndLGAs = {
        Abia: [
            'Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'Isiala Ngwa South',
            'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma', 'Ugwunagbo', 'Ukwa East', 'Ukwa West', 'Umuahia North',
            'Umuahia South', 'Umu Nneochi'
        ],
        Adamawa: [
            'Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Guyuk', 'Hong', 'Jada', 'Lamurde', 'Madagali', 'Maiha',
            'Mayo-Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan', 'Shelleng', 'Song', 'Toungo', 'Yola North',
            'Yola South'
        ],
        AkwaIbom: [
            'Abak', 'Eastern Obolo', 'Eket', 'Esit Eket', 'Essien Udim', 'Etim Ekpo', 'Etinan', 'Ibeno', 'Ibesikpo Asutan',
            'Ibiono-Ibom', 'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene', 'Ini', 'Itu', 'Mbo', 'Mkpat-Enin', 'Nsit-Atai',
            'Nsit-Ibom', 'Nsit-Ubium', 'Obot Akara', 'Okobo', 'Onna', 'Oron', 'Oruk Anam', 'Udung-Uko', 'Ukanafun', 'Uruan',
            'Urue-Offong/Oruko', 'Uyo'
        ],
        Anambra: [
            'Aguata', 'Anambra East', 'Anambra West', 'Anaocha', 'Awka North', 'Awka South', 'Ayamelum', 'Dunukofia',
            'Ekwusigo', 'Idemili North', 'Idemili South', 'Ihiala', 'Njikoka', 'Nnewi North', 'Nnewi South', 'Ogbaru',
            'Onitsha North', 'Onitsha South', 'Orumba North', 'Orumba South', 'Oyi'
        ],
        Bauchi: [
            'Alkaleri', 'Bauchi', 'Bogoro', 'Damban', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa', 'Giade', 'Itas/Gadau', 'Jama\'are',
            'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira', 'Tafawa Balewa', 'Toro', 'Warji', 'Zaki'
        ],
        Bayelsa: [
            'Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 'Yenagoa'
        ],
        Benue: [
            'Ado', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer East', 'Gwer West', 'Katsina-Ala', 'Konshisha', 'Kwande',
            'Logo', 'Makurdi', 'Obi', 'Ogbadibo', 'Ohimini', 'Oju', 'Okpokwu', 'Otukpo', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya'
        ],
        Borno: [
            'Abadam', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa', 'Dikwa', 'Gubio', 'Guzamala', 'Gwoza', 'Hawul',
            'Jere', 'Kaga', 'Kala/Balge', 'Konduga', 'Kukawa', 'Kwaya Kusar', 'Mafa', 'Magumeri', 'Maiduguri', 'Marte',
            'Mobbar', 'Monguno', 'Ngala', 'Nganzai', 'Shani'
        ],
        CrossRiver: [
            'Abi', 'Akamkpa', 'Akpabuyo', 'Bakassi', 'Bekwarra', 'Biase', 'Boki', 'Calabar Municipal', 'Calabar South',
            'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani', 'Ogoja', 'Yakuur', 'Yala'
        ],
        Delta: [
            'Aniocha North', 'Aniocha South', 'Bomadi', 'Burutu', 'Ethiope East', 'Ethiope West', 'Ika North East', 'Ika South',
            'Isoko North', 'Isoko South', 'Ndokwa East', 'Ndokwa West', 'Okpe', 'Oshimili North', 'Oshimili South', 'Patani',
            'Sapele', 'Udu', 'Ughelli North', 'Ughelli South', 'Ukwuani', 'Uvwie', 'Warri North', 'Warri South', 'Warri South West'
        ],
        Ebonyi: [
            'Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South', 'Ikwo', 'Ishielu', 'Ivo',
            'Izzi', 'Ohaukwu', 'Onicha'
        ],
        Edo: [
            'Akoko-Edo', 'Egor', 'Esan Central', 'Esan North-East', 'Esan South-East', 'Esan West', 'Etsako Central',
            'Etsako East', 'Etsako West', 'Igueben', 'Ikpoba-Okha', 'Oredo', 'Orhionmwon', 'Ovia North-East', 'Ovia South-West',
            'Owan East', 'Owan West', 'Uhunmwonde'
        ],
        Ekiti: [
            'Ado-Ekiti', 'Efon', 'Ekiti East', 'Ekiti South-West', 'Ekiti West', 'Emure', 'Gbonyin', 'Ido-Osi', 'Ijero',
            'Ikere', 'Ikole', 'Ilejemeje', 'Irepodun/Ifelodun', 'Ise/Orun', 'Moba', 'Oye'
        ],
        Enugu: [
            'Aninri', 'Awgu', 'Enugu East', 'Enugu North', 'Enugu South', 'Ezeagu', 'Igbo Etiti', 'Igbo Eze North', 'Igbo Eze South',
            'Isi Uzo', 'Nkanu East', 'Nkanu West', 'Nsukka', 'Oji River', 'Udenu', 'Udi', 'Uzo-Uwani'
        ],
        Gombe: [
            'Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Gombe', 'Kaltungo', 'Kwami', 'Nafada', 'Shongom', 'Yamaltu/Deba'
        ],
        Imo: [
            'Aboh Mbaise', 'Ahiazu Mbaise', 'Ehime Mbano', 'Ezinihitte', 'Ideato North', 'Ideato South', 'Ihitte/Uboma',
            'Ikeduru', 'Isiala Mbano', 'Isu', 'Mbaitoli', 'Ngor Okpala', 'Njaba', 'Nkwerre', 'Nwangele', 'Obowo', 'Oguta',
            'Ohaji/Egbema', 'Okigwe', 'Onuimo', 'Orlu', 'Orsu', 'Oru East', 'Oru West', 'Owerri Municipal', 'Owerri North',
            'Owerri West'
        ],
        Jigawa: [
            'Auyo', 'Babura', 'Biriniwa', 'Birnin Kudu', 'Buji', 'Dutse', 'Gagarawa', 'Garki', 'Gumel', 'Guri', 'Gwaram',
            'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa', 'Kaugama', 'Kazaure', 'Kiri Kasama', 'Kiyawa', 'Maigatari',
            'Malam Madori', 'Miga', 'Ringim', 'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi'
        ],
        Kaduna: [
            'Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema\'a', 'Kachia', 'Kaduna North', 'Kaduna South',
            'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau', 'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga', 'Soba',
            'Zangon Kataf', 'Zaria'
        ],
        Kano: [
            'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa',
            'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam', 'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal',
            'Karaye', 'Kibiya', 'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa', 'Rano',
            'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudun Wada', 'Ungogo',
            'Warawa', 'Wudil'
        ],
        Katsina: [
            'Bakori', 'Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dandume', 'Danja', 'Dan Musa', 'Daura', 'Dutsi',
            'Dutsin Ma', 'Faskari', 'Funtua', 'Ingawa', 'Jibia', 'Kafur', 'Kaita', 'Kankara', 'Kankia', 'Katsina', 'Kurfi',
            'Kusada', 'Mai\'Adua', 'Malumfashi', 'Mani', 'Mashi', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa', 'Safana', 'Sandamu',
            'Zango'
        ],
        Kebbi: [
            'Aleiro', 'Arewa Dandi', 'Argungu', 'Augie', 'Bagudo', 'Birnin Kebbi', 'Bunza', 'Dandi', 'Fakai', 'Gwandu', 'Jega',
            'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski', 'Sakaba', 'Shanga', 'Suru', 'Wasagu/Danko', 'Yauri', 'Zuru'
        ],
        Kogi: [
            'Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Ibaji', 'Idah', 'Igalamela Odolu', 'Ijumu', 'Kabba/Bunu', 'Kogi',
            'Lokoja', 'Mopa Muro', 'Ofu', 'Ogori/Magongo', 'Okehi', 'Okene', 'Olamaboro', 'Omala', 'Yagba East', 'Yagba West'
        ],
        Kwara: [
            'Asa', 'Baruten', 'Edu', 'Ekiti', 'Ifelodun', 'Ilorin East', 'Ilorin South', 'Ilorin West', 'Irepodun', 'Isin',
            'Kaiama', 'Moro', 'Offa', 'Oke Ero', 'Oyun', 'Pategi'
        ],
        Lagos: [
            'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki',
            'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo',
            'Shomolu', 'Surulere'
        ],
        Nasarawa: [
            'Akwanga', 'Awe', 'Doma', 'Karu', 'Keana', 'Keffi', 'Kokona', 'Lafia', 'Nasarawa', 'Nasarawa Egon', 'Obi',
            'Toto', 'Wamba'
        ],
        Niger: [
            'Agaie', 'Agwara', 'Bida', 'Borgu', 'Bosso', 'Chanchaga', 'Edati', 'Gbako', 'Gurara', 'Katcha', 'Kontagora',
            'Lapai', 'Lavun', 'Magama', 'Mariga', 'Mashegu', 'Mokwa', 'Moya', 'Paikoro', 'Rafi', 'Rijau', 'Shiroro', 'Suleja',
            'Tafa', 'Wushishi'
        ],
        Ogun: [
            'Abeokuta North', 'Abeokuta South', 'Ado-Odo/Ota', 'Egbado North', 'Egbado South', 'Ewekoro', 'Ifo', 'Ijebu East',
            'Ijebu North', 'Ijebu North East', 'Ijebu Ode', 'Ikenne', 'Imeko Afon', 'Ipokia', 'Obafemi Owode', 'Odeda',
            'Odogbolu', 'Ogun Waterside', 'Remo North', 'Shagamu'
        ],
        Ondo: [
            'Akoko North-East', 'Akoko North-West', 'Akoko South-East', 'Akoko South-West', 'Akure North', 'Akure South',
            'Ese Odo', 'Idanre', 'Ifedore', 'Ilaje', 'Ile Oluji/Okeigbo', 'Irele', 'Odigbo', 'Okitipupa', 'Ondo East', 'Ondo West',
            'Ose', 'Owo'
        ],
        Osun: [
            'Aiyedaade', 'Aiyedire', 'Atakumosa East', 'Atakumosa West', 'Boluwaduro', 'Boripe', 'Ede North', 'Ede South',
            'Egbedore', 'Ejigbo', 'Ife Central', 'Ife East', 'Ife North', 'Ife South', 'Ifedayo', 'Ifelodun', 'Ila', 'Ilesa East',
            'Ilesa West', 'Irepodun', 'Irewole', 'Isokan', 'Iwo', 'Obokun', 'Odo Otin', 'Ola Oluwa', 'Olorunda', 'Oriade',
            'Orolu', 'Osogbo'
        ],
        Oyo: [
            'Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North', 'Ibadan North-East', 'Ibadan North-West',
            'Ibadan South-East', 'Ibadan South-West', 'Ibarapa Central', 'Ibarapa East', 'Ibarapa North', 'Ido', 'Irepo', 'Iseyin',
            'Itesiwaju', 'Iwajowa', 'Kajola', 'Lagelu', 'Ogo Oluwa', 'Ogbomosho North', 'Ogbomosho South', 'Olorunsogo',
            'Oluyole', 'Ona Ara', 'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East', 'Saki West', 'Surulere'
        ],
        Plateau: [
            'Barkin Ladi', 'Bassa', 'Bokkos', 'Jos East', 'Jos North', 'Jos South', 'Kanam', 'Kanke', 'Langtang North',
            'Langtang South', 'Mangu', 'Mikang', 'Pankshin', 'Qua\'an Pan', 'Riyom', 'Shendam', 'Wase'
        ],
        Rivers: [
            'Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni', 'Asari-Toru', 'Bonny', 'Degema', 'Eleme',
            'Emohua', 'Etche', 'Gokana', 'Ikwerre', 'Khana', 'Obio/Akpor', 'Ogba/Egbema/Ndoni', 'Ogu/Bolo', 'Okrika', 'Omuma',
            'Opobo/Nkoro', 'Oyigbo', 'Port Harcourt', 'Tai'
        ],
        Sokoto: [
            'Binji', 'Bodinga', 'Dange Shuni', 'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Illela', 'Isa', 'Kebbe', 'Kware',
            'Rabah', 'Sabon Birni', 'Shagari', 'Silame', 'Sokoto North', 'Sokoto South', 'Tambuwal', 'Tangaza', 'Tureta',
            'Wamako', 'Wurno', 'Yabo'
        ],
        Taraba: [
            'Ardo Kola', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Jalingo', 'Karim Lamido', 'Kurmi', 'Lau', 'Sardauna',
            'Takum', 'Ussa', 'Wukari', 'Yorro', 'Zing'
        ],
        Yobe: [
            'Bade', 'Bursari', 'Damaturu', 'Fika', 'Fune', 'Geidam', 'Gujba', 'Gulani', 'Jakusko', 'Karasuwa', 'Machina',
            'Nangere', 'Nguru', 'Potiskum', 'Tarmuwa', 'Yunusari', 'Yusufari'
        ],
        Zamfara: [
            'Anka', 'Bakura', 'Birnin Magaji/Kiyaw', 'Bukkuyum', 'Bungudu', 'Gummi', 'Gusau', 'Kaura Namoda', 'Maradun',
            'Maru', 'Shinkafi', 'Talata Mafara', 'Zurmi'
        ],
        FCT: ['Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council']
    };

    useEffect(() => {
        setStates(Object.keys(nigeriaStatesAndLGAs));
        setBanks(['Access Bank', 'GTBank', 'First Bank', 'Zenith Bank', 'UBA', 'wema Bank', 'fidelity-bank', "jaiz bank"]);
    }, []);

    useEffect(() => {

        setLocalGovtOptions(nigeriaStatesAndLGAs[formData.state] || []);
    }, [formData.state]);

    useEffect(() => {
        // Dynamic category options based on religion selection
        if (formData.religion === 'Muslim') {
            setCategoryOptions(['Ahmadiya', 'Tijanniah', 'Nasfat', 'Sufhi', 'Others']);
        } else if (formData.religion === 'Christian') {
            setCategoryOptions(['White Garment', 'CAC', 'Redeemer', 'MFM', 'Christ Embassy', 'Others']);
        } else if (formData.religion === 'Traditional') {
            setCategoryOptions(['traditional']);
        }
        else if (formData.religion === 'Burdist') {
            setCategoryOptions(['burdist']);
        }
        else {
            setCategoryOptions([]);
        }
    }, [formData.religion]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const form = new FormData();
            Object.keys(formData).forEach((key) => {
                form.append(key, formData[key]);
            });
            const response = await axios.post(`${import.meta.env.VITE_API_URL2}lsignup`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
            if (response.data) {
                navigate('/lverify-email')
                toast.success("successfully registered")
            }

        } catch (err) {
            setError(err.response?.data?.message || 'an error occured')
            console.log(err)
            toast.error(err)
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF9E8] mt-6">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                {error && <p className="text-red-500">{error}</p>}
                <h1 className="text-xl font-bold">Signup</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-lg w-full space-y-4">

                    {/* Title */}
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" disabled={isLoading} />

                    {/* First Name */}
                    <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} className="w-full p-2 border rounded" disabled={isLoading} />

                    {/* Last Name */}
                    <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} className="w-full p-2 border rounded" disabled={isLoading} />

                    {/* Ministry Name */}
                    <input type="text" name="ministryname" placeholder="Ministry Name" value={formData.ministryname} onChange={handleChange} className="w-full p-2 border rounded" disabled={isLoading} />

                    {/* Email */}
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" disabled={isLoading} />

                   
                    {/* Bio */}
                    <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} className="w-full p-2 border rounded" disabled={isLoading} ></textarea>

                    {/* Religion */}
                    <select name="religion" value={formData.religion} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select Religion</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Christian">Christian</option>
                        <option value="Traditional">Traditional</option>
                        <option value="Buddhist">Buddhist</option>
                    </select>

                    {/* Category (Based on religion selection) */}
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select Category</option>
                        {categoryOptions.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* State */}
                    <select name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select State</option>
                        {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>

                    {/* Local Govt Area (based on state selection) */}
                    <select name="localGovtArea" value={formData.localGovtArea} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select Local Govt Area</option>
                        {localGovtOptions.map((lga, index) => (
                            <option key={index} value={lga}>{lga}</option>
                        ))}
                    </select>

                    {/* Address */}
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" disabled={isLoading} />
                      {/* yearsInProfession */}
                      <input type="number" name="yearsInProfession" placeholder="Years in Profession" value={formData.yearsInProfession} onChange={handleChange} className="w-full p-2 border rounded" disabled={isLoading} />

                    {/* Bank Name */}
                    <select name="bankName" value={formData.bankName} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select Bank</option>
                        {banks.map((bank, index) => (
                            <option key={index} value={bank}>{bank}</option>
                        ))}
                    </select>

                    {/* Account Name */}
                    <input type="text" name="accountName" placeholder="Account Name" value={formData.accountName} onChange={handleChange} className="w-full p-2 border rounded" />

                    {/* Account Number */}
                    <input type="text" name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleChange} className="w-full p-2 border rounded" />

                    {/* Referee Name */}
                    <input type="text" name="refereename" placeholder="Referee Name" value={formData.refereename} onChange={handleChange} className="w-full p-2 border rounded" />

                    {/* Referee Email */}
                    <input type="email" name="refereeemail" placeholder="Referee Email" value={formData.refereeemail} onChange={handleChange} className="w-full p-2 border rounded" />

                    {/* Referee Phone */}
                    <input type="text" name="refereephone" placeholder="Referee Phone" value={formData.refereephone} onChange={handleChange} className="w-full p-2 border rounded" />

                    {/* Relationship */}
                    <input type="text" name="relationship" placeholder="Relationship" value={formData.relationship} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input
                        type="file"
                        name="profilePicture"
                        onChange={handleFileChange}
                        required
                        disabled={isLoading}
                        placeholder='profile pic'
                    />
                     {/* Password */}
                     <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" disabled={isLoading} />


                    <PasswordStrengthMeter password={formData.password} />

                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-emerald-600 text-white 
  font-bold rounded-lg shadow-lg hover:from-blue-800
  hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
   focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <AiOutlineLoading3Quarters className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
                    </motion.button>
                </form>
                <div className="mt-6 text-center text-gray-600">or</div>

                {/* Social Media Login Section */}
                <div className="flex justify-center gap-4 mt-4">
                    <motion.a href="#" className="p-3 bg-[#080C89] rounded-full text-white" whileHover={{ scale: 1.1 }}>
                        <FaFacebookF size={20} />
                    </motion.a>
                    <motion.a href="#" className="p-3 bg-[#080C89] rounded-full text-white" whileHover={{ scale: 1.1 }}>
                        <FaTwitter size={20} />
                    </motion.a>
                    <motion.a href="#" className="p-3 bg-[#080C89] rounded-full text-white" whileHover={{ scale: 1.1 }}>
                        <FaGoogle size={20} />
                    </motion.a>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account? <a href="/login" className="text-[#080C89] underline">Sign in</a>
                    </p>
                </div>
                {/* Image Section (For Bottom Images) */}
                <div className="flex justify-center gap-2 mt-6">
                    <img src={im} alt="Gallery Image 1" className="w-20 h-20 object-cover" />
                    <img src={im1} alt="Gallery Image 2" className="w-20 h-20 object-cover" />
                    <img src={im2} alt="Gallery Image 3" className="w-20 h-20 object-cover" />
                    <img src={im3} alt="Gallery Image 4" className="w-20 h-20 object-cover" />
                </div>
            </div>
        </div>
    );
};

export default Lsignup;
