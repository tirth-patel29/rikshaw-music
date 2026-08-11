export interface Track {
  index: number;
  title: string;
  artist: string;
}

const mockTracks = [
  { title: "Tum Hi Ho", artist: "Arijit Singh" },
  { title: "Channa Mereya", artist: "Arijit Singh" },
  { title: "Kal Ho Naa Ho", artist: "Sonu Nigam" },
  { title: "Tujh Mein Rab Dikhta Hai", artist: "Roop Kumar Rathod" },
  { title: "Kabira", artist: "Tochi Raina, Rekha Bhardwaj" },
  { title: "Pehla Nasha", artist: "Udit Narayan, Sadhana Sargam" },
  { title: "Chaiyya Chaiyya", artist: "Sukhwinder Singh, Sapna Awasthi" },
  { title: "Tere Bina", artist: "A.R. Rahman" },
  { title: "Agar Tum Saath Ho", artist: "Alka Yagnik, Arijit Singh" },
  { title: "Jeena Jeena", artist: "Atif Aslam" },
  { title: "Gerua", artist: "Arijit Singh, Antara Mitra" },
  { title: "Zaalima", artist: "Arijit Singh, Harshdeep Kaur" },
  { title: "Raabta", artist: "Arijit Singh" },
  { title: "Dil Diyan Gallan", artist: "Atif Aslam" },
  { title: "Hawayein", artist: "Arijit Singh" },
  { title: "Pal Pal Dil Ke Paas", artist: "Kishore Kumar" },
  { title: "Lag Ja Gale", artist: "Lata Mangeshkar" },
  { title: "Kora Kagaz Tha", artist: "Kishore Kumar, Lata Mangeshkar" },
  { title: "Mere Mehboob Qayamat Hogi", artist: "Kishore Kumar" },
  { title: "Ek Din Bik Jayega Mati Ke Mol", artist: "Mukesh" },
  { title: "Mera Joota Hai Japani", artist: "Mukesh" },
  { title: "Ajeeb Dastan Hai Yeh", artist: "Lata Mangeshkar" },
  { title: "Pyar Deewana Hota Hai", artist: "Kishore Kumar" },
  { title: "Yeh Dosti Hum Nahi Todenge", artist: "Kishore Kumar, Manna Dey" },
  { title: "Roop Tera Mastana", artist: "Kishore Kumar" },
  { title: "O Mere Dil Ke Chain", artist: "Kishore Kumar" },
  { title: "Chura Liya Hai Tumne Jo Dil Ko", artist: "Asha Bhosle, Mohammed Rafi" },
  { title: "Dekha Ek Khwab", artist: "Kishore Kumar, Lata Mangeshkar" },
  { title: "Kabhi Kabhie Mere Dil Mein", artist: "Mukesh" },
  { title: "Main Shair To Nahin", artist: "Shailendra Singh" },
  { title: "Dard-e-Dil", artist: "Mohammed Rafi" },
  { title: "Kya Hua Tera Wada", artist: "Mohammed Rafi" },
  { title: "Khoya Khoya Chand", artist: "Mohammed Rafi" },
  { title: "Suhani Raat Dhal Chuki", artist: "Mohammed Rafi" },
  { title: "Chaudhvin Ka Chand Ho", artist: "Mohammed Rafi" },
  { title: "Aap Ki Nazron Ne Samjha", artist: "Lata Mangeshkar" },
  { title: "In Aankhon Ki Masti", artist: "Asha Bhosle" },
  { title: "Piya Tu Ab To Aaja", artist: "Asha Bhosle" },
  { title: "Dum Maro Dum", artist: "Asha Bhosle" },
  { title: "Mehbooba Mehbooba", artist: "R.D. Burman" },
  { title: "Ek Ajnabee Haseena Se", artist: "Kishore Kumar" },
  { title: "Mere Sapno Ki Rani", artist: "Kishore Kumar" },
];

export const PLAYLIST_DATA: Track[] = Array.from({ length: 50 }, (_, i) => {
  const displayNum = i + 1;
  
  if (displayNum === 43) return { index: i, title: "Ae Mere Humsafar", artist: "Alka Yagnik & Udit Narayan" };
  if (displayNum === 44) return { index: i, title: "Tere Dar Par Sanam", artist: "Kumar Sanu" };
  if (displayNum === 45) return { index: i, title: "S.P. Balasubrahmanyam Sings Tumse...", artist: "Hemantkumar Mahale" };
  if (displayNum === 46) return { index: i, title: "Taaron Ka Chamakta Hum Tumhare Hain Sanam", artist: "T-Series" };
  if (displayNum === 47) return { index: i, title: "Doono Hi Mohabbat Ke", artist: "Altaf Raja" };
  if (displayNum === 48) return { index: i, title: "Ding Dong Dole", artist: "KituB" };
  if (displayNum === 49) return { index: i, title: "Dheere Dheere Tere Bina", artist: "T-Series" };
  if (displayNum === 50) return { index: i, title: "Kumar Sanu 90's Hits", artist: "Shemaroo Filmi Gaane" };

  const mock = mockTracks[i] || { title: `Classic Hits Vol ${i}`, artist: "Various Artists" };
  return { 
    index: i, 
    title: mock.title, 
    artist: mock.artist 
  };
});
