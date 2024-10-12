import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
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
const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    state: '',
    localGovtArea: '',
    profilePicture: null,
    phone:'',
    bio:'',
    address: '',
    accountName: '',
    accountNumber:'',
    bankName: '',
    category:'',
    religion: '',
  });
  const [localGovtOptions, setLocalGovtOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [states, setStates] = useState([]);
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  
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




  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data) {
        navigate('/verify-email');
        toast.success("Successfully registered");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      console.log(err)
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF9E8] mt-7"> {/* Light cream background */}
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#080C89]">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
            <input
            type="number"
            name="phone"
            placeholder="Phone number"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
            <textarea
            type="text"
            name="bio"
            placeholder="bio"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}>
            </textarea>
            <input
            type="text"
            name="address"
            placeholder="address"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />

             {/* Religion */}
             <select name="religion"  onChange={handleInputChange} className="w-full p-2 border rounded">
                        <option value="">Select Religion</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Christian">Christian</option>
                        <option value="Traditional">Traditional</option>
                        <option value="Buddhist">Buddhist</option>
                    </select>

                    {/* Category (Based on religion selection) */}
                    <select name="category"  onChange={handleInputChange} className="w-full p-2 border rounded">
                        <option value="">Select Category</option>
                        {categoryOptions.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
            
        
          {/* State */}
          <select name="state"  onChange={handleInputChange} className="w-full p-2 border rounded">
                        <option value="">Select State</option>
                        {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>

                    {/* Local Govt Area (based on state selection) */}
                    <select name="localGovtArea" onChange={handleInputChange} className="w-full p-2 border rounded">
                        <option value="">Select Local Govt Area</option>
                        {localGovtOptions.map((lga, index) => (
                            <option key={index} value={lga}>{lga}</option>
                        ))}
                    </select>
                          {/* Bank Name */}
                          <select name="bankName" onChange={handleInputChange} className="w-full p-2 border rounded">
                        <option value="">Select Bank</option>
                        {banks.map((bank, index) => (
                            <option key={index} value={bank}>{bank}</option>
                        ))}
                    </select>

                    {/* Account Name */}
                    <input type="text" name="accountName" placeholder="Account Name"  onChange={handleInputChange} className="w-full p-2 border rounded" />

                    {/* Account Number */}
                    <input type="text" name="accountNumber" placeholder="Account Number" onChange={handleInputChange} className="w-full p-2 border rounded" />
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            required
            disabled={isLoading}
          />
            <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
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

export default Signup;






