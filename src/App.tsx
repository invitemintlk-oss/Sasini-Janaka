import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock } from "lucide-react";

/**
 * Pastel Wedding Invitation Theme (sage, dusty blue, butter, blush)
 * Names: Sasini & Janaka
 * Background: White
 * Accents: Pastel palette
 */

const backgroundMusic = "/hathara-kendare.mp3";


const flowerArchImage = "/silver_orchid_arch.png";
const brideGroomImage = "/couple.jpeg";

type InviteImageProps = React.ComponentProps<"img"> & {
  eager?: boolean;
};

function InviteImage({ eager = false, loading, decoding, ...props }: InviteImageProps) {
  return (
    <img
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      {...props}
    />
  );
}

function MandalaFrame({ minimal = false }: { minimal?: boolean }) {
  return (
    <div className="mandala-frame pointer-events-none fixed inset-0 z-[12] overflow-hidden" aria-hidden="true">
    </div>
  );
}

function FloatingPetals({ disabled = false, vibrant = false }: { disabled?: boolean; vibrant?: boolean }) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    if (disabled) {
      setPetals([]);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const silverColors = ["#EBCFCF", "#A8B8C0", "#F4DE8C", "#959F8B"];
    const vibrantColors = ["#E8A9A9", "#EBCFCF", "#A8B8C0", "#F4DE8C", "#959F8B", "#F7D9BF"];
    const colors = vibrant ? vibrantColors : silverColors;

    const petalCount = isMobile ? (vibrant ? 15 : 10) : (vibrant ? 25 : 18);
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, [disabled, vibrant]);

  if (disabled) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(168,184,192,0.5)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const targetDate = new Date("Jan 28, 2027 12:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className="relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-gradient-to-b from-blush-50 to-white rounded-t-full shadow-[0_15px_35px_-10px_rgba(95,120,136,0.25)] border border-blush-200 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] paper-grain w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-theme-300/50 rounded-t-full pointer-events-none" />

            {/* The Number */}
            <span className="text-[25px] sm:text-3xl md:text-5xl font-playball text-theme-800 leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-theme-700 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-butter-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-blush-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Google Apps Script Web App URL for Sasini & Janaka's RSVP sheet
// (paste the /exec URL from Deploy → New deployment → Web app; see Code.ts)
const SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Guest Details from URL
  const params = new URLSearchParams(window.location.search);
  const guestPrefix = params.get('p');
  const guestName = params.get('n');
  const hasGuest = guestPrefix && guestName;

  // Form State
  const [rsvpData, setRsvpData] = useState({ name: guestName || "", guests: "1", dietary: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "rsvp_success" | "error">(null);

  const handleSubmit = async (formName: "rsvp", data: typeof rsvpData) => {
    if (!SCRIPT_URL.startsWith("https://script.google.com/")) {
      alert("RSVP is not connected yet. Please set SCRIPT_URL in App.tsx.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const params = new URLSearchParams();
      params.append("formName", formName);

      // Keys must match the column names in Code.ts (HEADERS)
      const declined = data.guests === "0";
      params.append("Name", data.name);
      params.append("Attending", declined ? "No" : "Yes");
      params.append("Guests", declined ? "0" : data.guests);
      params.append("Wish", data.dietary);
      params.append("Invited As", hasGuest ? `${guestPrefix} ${guestName}` : "");

      // Using GET with no-cors is the most reliable way to trigger Google Apps Script
      // even if the browser blocks the JSON response due to CORS redirects.
      await fetch(`${SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache'
      });

      // Since we use no-cors, we can't read the response, so we assume success if no exception
      setSubmitStatus("rsvp_success");

      // Reset forms
      setRsvpData({ name: guestName || "", guests: "1", dietary: "" });

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };


  const openInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;
    const getDeviceMemory = () => (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    const updatePerformanceMode = () => {
      const constrainedNetwork = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
      const lowMemory = typeof getDeviceMemory() === "number" && getDeviceMemory()! <= 4;
      const smallScreen = window.innerWidth < 768;
      setIsLowPerformanceMode(motionMedia.matches || constrainedNetwork || lowMemory || smallScreen);
    };

    updatePerformanceMode();
    motionMedia.addEventListener("change", updatePerformanceMode);
    window.addEventListener("resize", updatePerformanceMode);
    connection?.addEventListener?.("change", updatePerformanceMode);

    return () => {
      motionMedia.removeEventListener("change", updatePerformanceMode);
      window.removeEventListener("resize", updatePerformanceMode);
      connection?.removeEventListener?.("change", updatePerformanceMode);
    };
  }, []);

  return (
    <main
      className={`h-[100dvh] w-full bg-[#FFFFFF] transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden smooth-mobile-scroll" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <audio ref={audioRef} src={backgroundMusic} loop />
      <MandalaFrame minimal={isLowPerformanceMode} />
      <FloatingPetals disabled={isLowPerformanceMode} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 1, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden"
          >
            {/* Colorful Animated Background Flares */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/pastel-floral-bg.png')" }} />

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15],
                x: [-20, 20, -20],
                y: [-20, 20, -20]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -left-[10%] w-[60%] aspect-square bg-gradient-to-br from-blush-300/30 to-peach-200/40 blur-[120px] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
                x: [20, -20, 20],
                y: [20, -20, 20]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[15%] -right-[15%] w-[70%] aspect-square bg-gradient-to-tl from-butter-200/40 to-blush-200/40 blur-[140px] rounded-full"
            />

            <FloatingPetals disabled={isLowPerformanceMode} vibrant={true} />

            <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />

            {/* Background Video Strip for Mobile / Full for Desktop */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-[35vh] md:h-full group">
                <video
                  autoPlay
                  muted
                  playsInline
                  onEnded={openInvitation}
                  className="w-full h-full object-cover shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] mix-blend-multiply"
                  src="/Use_the_uploaded_202604161807.mp4"
                />
                {/* Colorful Frame for the strip */}
                <div className="absolute inset-0 border-y-2 border-white/40 md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 md:hidden" />
              </div>
            </div>

            {/* Soft colorful overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blush-50/10 via-transparent to-theme-50/20" />

            {/* Interaction Button with colorful glow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative z-[101] mt-auto mb-20 md:mb-24"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blush-200 via-butter-100 to-theme-200 blur-2xl opacity-40 animate-pulse" />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={openInvitation}
                className="group relative flex flex-col items-center gap-4 bg-white/95 backdrop-blur-md border border-white/60 px-14 py-6 rounded-full text-stone-800 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-500 hover:shadow-blush-200/30"
              >
                <span className="font-cinzel text-[15px] tracking-[0.6em] uppercase font-bold bg-gradient-to-r from-theme-700 to-theme-900 bg-clip-text text-transparent">
                  Open Invitation
                </span>
                <div className="w-10 h-[1.5px] bg-gradient-to-r from-blush-300 via-butter-300 to-theme-300 group-hover:w-20 transition-all duration-500" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blush-400 animate-pulse">
                  Tap to Reveal
                </span>
              </motion.button>
            </motion.div>

            {/* Monogram with color accent */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <p className="font-cinzel text-[11px] tracking-[0.8em] font-bold uppercase flex flex-col items-center gap-3">
                <span className="bg-gradient-to-r from-blush-400 via-butter-400 to-theme-400 bg-clip-text text-transparent opacity-80">S & J</span>
                <span className="h-px w-8 bg-gradient-to-r from-transparent via-blush-300 to-transparent" />
              </p>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border-2 border-blush-200 text-theme-800 hover:bg-blush-50 transition-all hover:scale-110"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            {/* Hero Section */}
            <section 
              className="min-h-[100dvh] w-full flex items-center justify-center p-4 md:p-12 relative overflow-hidden bg-center bg-cover"
              style={{ backgroundImage: "url('/ChatGPT Image Aug 29, 2026, 04_06_21 AM.png')" }}
            >
              {/* Background texture (optional, keep for effect) */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain" />

              {/* Large Watermark Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cinzel text-[40vw] text-blush-500 pointer-events-none whitespace-nowrap leading-none select-none z-0"
              >
                S&J
              </motion.div>

              {/* Central Content Container */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                className="relative z-10 w-full max-w-[420px] min-h-[500px] h-[85vh] md:h-[80vh] flex flex-col items-center justify-center p-6 pt-12 md:p-10 md:pt-16"
              >

                <div className="mb-10" />

                <div className="flex flex-col items-center text-center space-y-4 flex-1 w-full relative z-10">
                  <div className="mb-4" />

                  <div className="space-y-0 py-4 flex-1 flex flex-col justify-center">
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="font-playball text-[3rem] sm:text-[3.5rem] md:text-[5rem] text-theme-900 leading-[1.1] drop-shadow-sm"
                    >
                      Sasini
                    </motion.h1>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="font-playball text-[31px] md:text-5xl text-blush-400 italic font-light my-2 md:my-4 tracking-widest"
                    >
                      &
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                      className="font-playball text-[3rem] sm:text-[3.5rem] md:text-[5rem] text-theme-900 leading-[1.1] drop-shadow-sm"
                    >
                      Janaka
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 1 }}
                      className="mt-6 md:mt-10"
                    >
                      <span className="inline-block text-[10px] md:text-[13px] uppercase tracking-[0.6em] md:tracking-[0.8em] text-theme-900 font-bold px-5 py-2 rounded-full bg-blush-100/70 border border-blush-200">
                        Please join us
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-auto pb-4 w-full flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center gap-4 mb-6 opacity-70 w-full px-8">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-blush-300 to-butter-300" />
                      <div className="w-1.5 h-1.5 rotate-45 bg-blush-400 shrink-0" />
                      <div className="h-px w-full bg-gradient-to-l from-transparent via-theme-300 to-butter-300" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
              >
                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-stone-400 font-bold group-hover:text-theme-600 transition-colors">Begin</span>
                <div className="w-px h-10 md:h-12 relative overflow-hidden bg-stone-200">
                  <motion.div
                    animate={{ y: [-40, 60] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-8 bg-blush-400"
                  />
                </div>
              </motion.div>

            </section>


            {/* Wedding Details Section */}
            <section className="cv-auto py-24 md:py-32 w-full flex flex-col items-center px-4 relative wash-blush">
              <div className="section-floral-overlay absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
              </div>

              <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <div className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-transparent via-blush-300 to-transparent mb-8 md:mb-12 shadow-[0_0_10px_rgba(168,184,192,0.3)]" />
                  <div className="text-zinc-800 text-center max-w-2xl px-6">
                    <span className="text-blush-500 block text-[10px] md:text-xs uppercase font-cinzel mb-4 md:mb-6 tracking-[0.5em] md:tracking-[0.6em] font-semibold drop-shadow-sm">
                      Wedding Celebration
                    </span>
                    {hasGuest && (
                      <span className="block text-[31px] md:text-4xl font-playball text-theme-700 mb-8 capitalize tracking-wide drop-shadow-sm">
                        {guestPrefix.toLowerCase() === 'dear' ? `Dear ${guestName},` : `Dear ${guestPrefix} ${guestName},`}
                      </span>
                    )}
                    <p className="font-serif text-[21px] md:text-2xl leading-[1.8] md:leading-loose text-zinc-700 font-light italic">
                      You are cordially invited to
                      <br className="hidden md:block" />
                      <span className="text-blush-500 font-medium block mt-2 md:mt-0 md:inline"> celebrate the union of</span>
                    </p>
                  </div>
                  <div className="w-16 h-[2px] bg-gradient-to-r from-blush-300 via-butter-300 to-theme-300 mt-8 md:mt-10 shadow-[0_0_10px_rgba(168,184,192,0.3)]" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative mb-10 md:mb-14"
                >
                  <div className="absolute -inset-3 md:-inset-4 rounded-[2rem] bg-gradient-to-br from-blush-200/70 via-butter-200/60 to-theme-200/70 blur-xl" />
                  <div className="relative bg-white/90 p-2.5 md:p-3 rounded-[2rem] border border-blush-200 shadow-[0_20px_50px_-20px_rgba(75,85,99,0.45)]">
                    <InviteImage
                      src={brideGroomImage}
                      alt="Sasini and Janaka"
                      loading="eager"
                      className="w-[200px] h-[240px] md:w-[270px] md:h-[320px] object-cover object-[center_25%] rounded-[1.6rem] border border-theme-100"
                    />
                  </div>
                </motion.div>

                <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:items-stretch gap-6 md:gap-10 my-12 md:my-20 z-10 px-2 lg:px-8">

                  {/* Sasini's Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-white to-blush-100 w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(201,127,128,0.25)] border border-blush-200 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
                  >
                    <div className="absolute inset-2 border-[1.5px] border-blush-300/70 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none shadow-[inset_0_0_15px_rgba(168,184,192,0.1)]" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-blush-500">Beloved daughter of</p>
                        <p className="text-[13px] md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed">Mr. G. Dasanayaka<br />& Mrs. N. M. Wickramasinghe</p>
                      </div>
                      <h3 className="text-[49px] md:text-7xl font-playball text-blush-500 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Sasini</h3>
                    </div>
                  </motion.div>

                  {/* Vertical Divider / AMPERSAND */}
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 relative z-20">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-t from-blush-300 to-transparent" />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blush-300 via-butter-300 to-theme-400 rounded-full flex items-center justify-center shadow-xl shadow-blush-500/25 border-4 border-white"
                    >
                      <span className="text-[31px] md:text-5xl font-playball text-white md:-mt-1 drop-shadow-md">&</span>
                    </motion.div>
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-300 to-transparent" />
                  </div>

                  {/* Janaka's Card - Offset structurally on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-gradient-to-bl from-white to-theme-100 w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(95,120,136,0.25)] border border-theme-200 rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[130px] md:rounded-bl-[130px] overflow-hidden group flex flex-col justify-center text-center items-center md:mt-24"
                  >
                    <div className="absolute inset-2 border-[1.5px] border-theme-300/70 rounded-tr-[90px] rounded-bl-[90px] md:rounded-tr-[120px] md:rounded-bl-[120px] pointer-events-none shadow-[inset_0_0_15px_rgba(168,184,192,0.1)]" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-theme-600">Beloved son of</p>
                        <p className="text-[13px] md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed">Mr. S. S. Nishantha<br />& Mrs. N. B. K. Jumath</p>
                      </div>
                      <h3 className="text-[49px] md:text-7xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Janaka</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Date & Time Luxury Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center space-y-6 md:space-y-10 mt-2 md:mt-16 w-full"
                >
                  <div className="w-1.5 h-1.5 rotate-45 bg-blush-300" />

                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-32 text-center w-full max-w-4xl px-4">
                    <div className="flex flex-col items-center flex-1">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-blush-400 mb-2 md:mb-4" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-theme-600 font-bold mb-1 md:mb-3">The Date</p>
                      <p className="font-cinzel text-[21px] md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">2027.01.28</p>
                      <p className="font-cinzel text-[19px] md:text-xl text-blush-500 tracking-[0.3em] font-normal mt-1 md:mt-2">THURSDAY</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-butter-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="md:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-butter-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    <div className="flex flex-col items-center flex-1">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-sage-400 mb-2 md:mb-4" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-theme-600 font-bold mb-1 md:mb-3">The Time</p>
                      <p className="font-cinzel text-[21px] md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">12:00 PM</p>
                      <p className="font-cinzel text-[13px] md:text-sm text-blush-500 tracking-[0.2em] mt-1 md:mt-3 uppercase">Onwards</p>
                    </div>
                  </div>

                  {/* Poruwa Ceremony Highlight */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-8 md:mt-24 pt-6 md:pt-12 border-t border-blush-200 w-full max-w-[320px] md:max-w-xl flex flex-col items-center relative"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FDF7F5] px-6">
                      <Sparkles className="w-6 h-6 text-butter-400" />
                    </div>

                    <div className="space-y-4 flex flex-col items-center">
                      <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-sage-500 font-bold">Auspicious Ceremony</p>
                      <h4 className="font-cinzel text-[25px] md:text-4xl text-theme-900 tracking-[0.3em] font-bold drop-shadow-sm px-4 text-center">PORUWA CEREMONY</h4>

                    </div>

                    {/* Decorative element below */}
                    <div className="mt-6 md:mt-10 flex items-center gap-2 opacity-70">
                      <div className="w-1.5 h-1.5 rounded-full bg-blush-300" />
                      <div className="w-1.5 h-1.5 rounded-full bg-butter-300" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-300" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="cv-auto py-24 md:py-36 wash-sky relative border-y border-theme-100/30 flex flex-col items-center overflow-hidden">
              {/* Premium Background Elements */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-white blur-[120px] rounded-full opacity-50 pointer-events-none" />

              <div className="w-full max-w-[1000px] px-4 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full flex flex-col items-center"
                >
                  {/* Watermark text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[12vw] md:text-[140px] text-blush-200/60 whitespace-nowrap pointer-events-none z-0 select-none">
                    Forever
                  </div>

                  <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
                    <div className="h-[2px] w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-500 shadow-[0_0_8px_rgba(168,184,192,0.4)]" />
                    <div className="w-2 h-2 rotate-45 bg-blush-400 shrink-0" />
                    <div className="h-[2px] w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-500 shadow-[0_0_8px_rgba(168,184,192,0.4)]" />
                  </div>

                  <h2 className="font-cinzel text-[31px] md:text-5xl text-theme-900 mb-8 relative z-10 tracking-widest font-bold drop-shadow-sm px-4 leading-[1.4]">
                    Wait for the <span className="font-playball text-blush-500 italic lowercase tracking-normal text-[37px] md:text-7xl ml-2">magic</span>
                  </h2>

                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-theme-700 font-bold bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-blush-200 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                    Counting Down
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                  </p>
                </motion.div>

                <CountdownTimer />
              </div>
            </section>

            {/* Venue Location Section */}
            <section className="cv-auto py-24 md:py-36 wash-sage relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blush-200 blur-[150px] rounded-full opacity-40 pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 flex flex-col items-start"
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-[2px] bg-theme-500 shadow-[0_0_8px_rgba(168,184,192,0.4)]" />
                        <span className="text-sage-500 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">The Venue</span>
                      </div>
                      <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-900 leading-[1] drop-shadow-sm ml-[-4px]">
                        Hotel Sanara Mandira
                      </h2>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-sage-400 to-transparent" />

                      <div className="pl-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-blush-200 absolute -left-5 top-0">
                          <MapPin className="w-4 h-4 text-blush-400" />
                        </div>
                        <p className="text-[19px] md:text-xl text-theme-800 font-cinzel font-medium leading-relaxed tracking-wide">
                          Ground Floor,<br /> Sri Lanka.
                        </p>
                      </div>

                      <div className="pl-8 space-y-4 pt-4 text-theme-600 text-[15px] md:text-base tracking-wide font-light leading-relaxed">
                        We look forward to welcoming you to this beautiful sanctuary to celebrate our special day amidst nature's elegance.
                      </div>
                    </div>

                    <div className="pt-8 w-full md:w-auto">
                      <button
                        onClick={() => window.open('https://share.google/ZEAVNFJaMv4CV8DOY', '_blank')}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-theme-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        Get Directions
                      </button>
                    </div>
                  </motion.div>

                  {/* Arched Map Container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => window.open('https://share.google/ZEAVNFJaMv4CV8DOY', '_blank')}
                    className="cursor-pointer relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white ring-2 ring-blush-200 bg-theme-100 overflow-hidden group"
                  >
                    <div className="absolute inset-0 border border-theme-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />

                    {/* The Hotel Image */}
                    <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <iframe
                        src="https://maps.google.com/maps?q=Sanara%20Mandira&z=15&output=embed"
                        className="w-full h-full border-0 pointer-events-none"
                        title="Hotel Sanara Mandira map"
                        loading="lazy"
                      />
                    </div>

                    {/* Elegant fade overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                      <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/90 px-5 py-2 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blush-400 animate-pulse" />
                        View on Map
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* RSVP Section */}
            <section className="cv-auto py-24 md:py-36 bg-theme-900 text-white relative overflow-hidden flex flex-col items-center">
              {/* Opulent dark background */}
              <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] bg-blush-400 blur-[150px] rounded-full opacity-25 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] bg-sage-400 blur-[150px] rounded-full opacity-25 pointer-events-none" />

              <div className="container mx-auto px-4 max-w-2xl text-center relative z-10 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-butter-200 font-bold mb-6">Will You Join Us?</p>
                  <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-white mb-6 drop-shadow-md">RSVP</h2>
                  <div className="flex items-center gap-4 justify-center w-full mb-8 opacity-60">
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-theme-300" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-blush-200" />
                    <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-theme-300" />
                  </div>
                  <p className="text-theme-100 text-[15px] md:text-base max-w-md mx-auto leading-relaxed mb-16 tracking-wide font-light">
                    We would be absolutely thrilled to celebrate with you. Kindly RSVP at your earliest convenience.
                  </p>

                  {/* Premium RSVP Form */}
                  <div className="w-full bg-white/5 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[2rem] border border-blush-200/25 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                    <form className="space-y-8 text-left" onSubmit={(e) => { e.preventDefault(); handleSubmit("rsvp", rsvpData); }}>
                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-blush-200 ml-2">Full Name</label>
                        <input
                          type="text"
                          required
                          value={rsvpData.name}
                          onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-butter-300 transition-colors font-cinzel text-[19px] md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-blush-200 ml-2">Guests</label>
                        <div className="relative">
                          <select
                            value={rsvpData.guests}
                            onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                            className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white focus:outline-none focus:border-butter-300 transition-colors font-cinzel text-[19px] md:text-xl tracking-wide appearance-none cursor-pointer"
                          >
                            <option value="1" className="bg-[#18181B] text-white">1 Guest (Just Me)</option>
                            <option value="2" className="bg-[#18181B] text-white">2 Guests</option>
                            <option value="3" className="bg-[#18181B] text-white">3 Guests</option>
                            <option value="4" className="bg-[#18181B] text-white">4 Guests</option>
                            <option value="0" className="bg-[#18181B] text-theme-300">Regretfully Decline</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="w-2 h-2 border-r border-b border-theme-300 rotate-45 transform -translate-y-[25%]" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-blush-200 ml-2">Wish</label>
                        <input
                          type="text"
                          value={rsvpData.dietary}
                          onChange={(e) => setRsvpData({ ...rsvpData, dietary: e.target.value })}
                          placeholder="Your wishes for the couple..."
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-butter-300 transition-colors font-cinzel text-[19px] md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="pt-10">
                        <button
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blush-200 via-butter-200 to-theme-200 text-theme-900 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group inline-flex justify-center items-center gap-4"
                        >
                          {isSubmitting ? "Sending..." : (submitStatus === "rsvp_success" ? "Thank You!" : "Send RSVP")}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Wishing Section and Footer Wrapper */}
            <div className="relative wash-bouquet">
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />

              <section className="cv-auto py-24 md:py-36 relative flex flex-col items-center overflow-hidden">

                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >


                    <div className="mt-12 md:mt-24 space-y-6 flex flex-col items-center relative w-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[22vw] md:text-[220px] text-blush-200/50 whitespace-nowrap pointer-events-none z-0 select-none">
                        Thank You
                      </div>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-[0.8em] text-blush-500 font-bold relative z-10 bg-white px-6 py-2 rounded-full border border-blush-200 shadow-sm">With Love</p>
                      <h3 className="font-playball text-[3.2rem] sm:text-6xl md:text-8xl text-theme-900 relative z-10 drop-shadow-sm px-4 pt-4 leading-none">Sasini & Janaka</h3>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-20 border-t border-blush-200 text-center relative z-10 space-y-6">
                <p className="text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-theme-700 font-bold">
                  © 2027 Sasini & Janaka. All rights reserved.
                </p>

                <div className="flex flex-col items-center gap-2 pt-8">
                  <a
                    href="https://wa.me/94707819074"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center"
                  >
                    <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold group-hover:text-theme-600 transition-colors">
                      Design by
                    </span>
                    <span className="font-playball text-[25px] md:text-3xl text-theme-800 group-hover:scale-110 transition-transform duration-500">
                      invitemint
                    </span>
                    <span className="text-[9px] md:text-[11px] tracking-[0.2em] text-stone-400 font-medium mt-1">
                      +94 70 781 9074
                    </span>
                    <div className="w-8 h-px bg-blush-300 group-hover:w-20 transition-all duration-500 mt-2" />
                  </a>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-very {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .animate-spin-slow-very {
          animation: spin-slow-very linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #FFFCF8;
        }
        ::-webkit-scrollbar-thumb {
          background: #E8A9A9;
          border-radius: 10px;
        }
      `}} />
    </main>
  );
}
