import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// List of 50 humorous proposal titles
const proposalTitles = [
  "Làm người yêu anh nhé? Anh hứa sẽ không ăn hết đồ ăn vặt của em đâu!",
  "Em có muốn làm 'crush' hợp pháp của anh không?",
  "Anh không phải là Google, nhưng anh nghĩ chúng ta có thể tìm thấy mọi thứ cùng nhau. Làm người yêu anh nhé?",
  "Em có muốn cùng anh già đi và tranh giành điều khiển TV không?",
  "Trái tim anh đang 'loading'... Em có muốn làm 'password' của nó không?",
  "Anh có một chỗ trống trong tim, và nó có tên là 'em'.",
  "Em có muốn cùng anh phá vỡ mọi quy tắc ăn kiêng không?",
  "Anh không hoàn hảo, nhưng anh có em thì sẽ hoàn hảo. Làm người yêu anh nhé?",
  "Em có muốn làm người duy nhất anh chịu nghe lời không?",
  "Anh có thể không phải là hoàng tử, nhưng anh có thể là người pha cà phê cho em mỗi sáng.",
  "Em có muốn cùng anh tạo ra những kỷ niệm đáng xấu hổ không?",
  "Anh muốn em là người duy nhất được thấy anh lúc mới ngủ dậy.",
  "Em có muốn cùng anh chinh phục thế giới... bắt đầu từ việc dọn nhà không?",
  "Anh không biết nấu ăn, nhưng anh biết cách yêu em. Làm người yêu anh nhé?",
  "Em có muốn cùng anh xem phim dở tệ và vẫn cười phá lên không?",
  "Anh có một trái tim, và nó đang tìm kiếm một 'chủ sở hữu' xứng đáng.",
  "Em có muốn cùng anh biến những ngày bình thường thành những ngày 'bất thường' không?",
  "Anh có một câu hỏi quan trọng: Em có muốn làm người yêu anh không? (Trả lời 'Không' là anh lại hỏi đấy!)",
  "Em có muốn cùng anh trở thành 'cặp đôi vàng' trong truyền thuyết không?",
  "Anh hứa sẽ không bao giờ hỏi 'Em đang nghĩ gì đấy?' nếu em không muốn nói.",
  "Em có muốn cùng anh đi du lịch vòng quanh thế giới... trong mơ không?",
  "Anh không phải là thợ sửa ống nước, nhưng anh có thể sửa trái tim tan vỡ của em.",
  "Em có muốn cùng anh tạo ra những 'drama' nhỏ để cuộc sống thêm màu sắc không?",
  "Anh có một bí mật: Anh thích em. Em có muốn giữ bí mật này cùng anh không?",
  "Em có muốn cùng anh 'phá đảo' mọi trò chơi trên điện thoại không?",
  "Anh không phải là siêu anh hùng, nhưng anh có thể bảo vệ em khỏi những con muỗi.",
  "Em có muốn cùng anh ăn pizza cả ngày không?",
  "Anh có thể không có 6 múi, nhưng anh có một trái tim yêu em chân thành.",
  "Em có muốn cùng anh 'lạc trôi' vào thế giới của những bộ phim hoạt hình không?",
  "Anh hứa sẽ luôn là người đầu tiên 'like' ảnh của em.",
  "Em có muốn cùng anh 'phá hủy' mọi kế hoạch tập gym không?",
  "Anh có thể không phải là ca sĩ, nhưng anh sẽ hát cho em nghe mỗi khi em buồn.",
  "Em có muốn cùng anh 'cày' phim bộ đến sáng không?",
  "Anh không có siêu năng lực, nhưng anh có thể khiến em cười.",
  "Em có muốn cùng anh 'troll' bạn bè không?",
  "Anh có thể không phải là đầu bếp giỏi, nhưng anh có thể gọi đồ ăn ngon cho em.",
  "Em có muốn cùng anh 'chìm đắm' trong thế giới của những cuốn sách không?",
  "Anh hứa sẽ không bao giờ để em phải ngủ một mình... trừ khi em muốn.",
  "Em có muốn cùng anh 'sống ảo' mọi lúc mọi nơi không?",
  "Anh không phải là nhà thơ, nhưng anh có thể viết những lời yêu thương 'sến súa' cho em.",
  "Em có muốn cùng anh 'ăn sập' mọi quán ăn ngon không?",
  "Anh có thể không phải là người giàu nhất, nhưng anh có thể làm em hạnh phúc nhất.",
  "Em có muốn cùng anh 'quẩy' hết mình trong mọi bữa tiệc không?",
  "Anh hứa sẽ luôn là 'bờ vai' vững chắc cho em dựa vào... ngay cả khi anh đang ngủ.",
  "Em có muốn cùng anh 'làm mưa làm gió' trên mạng xã hội không?",
  "Anh không phải là bác sĩ, nhưng anh có thể chữa lành mọi vết thương lòng của em.",
  "Em có muốn cùng anh 'phá tan' mọi kỷ lục về việc lười biếng không?",
  "Anh có thể không phải là người hoàn hảo, nhưng anh là người hoàn hảo nhất để yêu em.",
  "Em có muốn cùng anh 'tạo ra' những khoảnh khắc 'điên rồ' không?",
  "Anh hứa sẽ không bao giờ để em phải cô đơn... ngay cả khi em đang giận anh."
];


function App() {
  const [agreeScale, setAgreeScale] = useState(1);
  const [disagreeScale, setDisagreeScale] = useState(1);
  const [showModal, setShowModal] = useState(false);
  // Initial position of the "Disagree" button, will be calculated in useEffect
  const [disagreePosition, setDisagreePosition] = useState({ top: '0px', left: '0px' });
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [currentTitle, setCurrentTitle] = useState(proposalTitles[0]); // State for the dynamic title

  const agreeButtonRef = useRef(null); // Ref to get the size and position of the "Agree" button
  const disagreeButtonRef = useRef(null); // Ref to get the size and position of the "Disagree" button
  const buttonsContainerRef = useRef(null); // Ref to get the size and position of the container holding both buttons

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set initial position of the "Disagree" button to align with the "Agree" button
  useEffect(() => {
    if (agreeButtonRef.current && disagreeButtonRef.current && buttonsContainerRef.current) {
      const agreeButtonRect = agreeButtonRef.current.getBoundingClientRect();
      const disagreeButtonRect = disagreeButtonRef.current.getBoundingClientRect();
      const containerRect = buttonsContainerRef.current.getBoundingClientRect();

      let newTop, newLeft;

      if (windowSize.width < 640) { // On mobile devices: buttons stack vertically
        const spaceY = 24; // Tailwind's space-y-6 equivalent
        // Center horizontally within the container
        newLeft = (containerRect.width / 2) - (disagreeButtonRect.width / 2);
        // Position below the "Agree" button, relative to the container's top edge
        newTop = (agreeButtonRect.bottom - containerRect.top) + spaceY;
      } else { // On desktop: buttons are side-by-side horizontally
        const spaceX = 32; // Tailwind's space-x-8 equivalent

        // Calculate total width of both buttons + space between them
        const totalButtonsWidth = agreeButtonRect.width + spaceX + disagreeButtonRect.width;

        // Calculate the starting position (left edge) to center the button group within the container
        const initialGroupLeft = (containerRect.width / 2) - (totalButtonsWidth / 2);

        // Position the "Disagree" button relative to the top-left edge of the container
        newTop = agreeButtonRect.top - containerRect.top; // Align with the top edge of the "Agree" button
        newLeft = initialGroupLeft + agreeButtonRect.width + spaceX; // Position after the "Agree" button based on calculated position
      }

      setDisagreePosition({
        top: `${newTop}px`,
        left: `${newLeft}px`,
      });
    }
  }, [windowSize]); // Recalculate when window size changes

  // Handle "Disagree" button click
  const handleDisagree = () => {
    console.log("handleDisagree called!"); // Debugging log
    // Shrink the "Disagree" button and enlarge the "Agree" button
    setAgreeScale(prevScale => prevScale + 0.2);
    setDisagreeScale(prevScale => (prevScale - 0.2 > 0.4 ? prevScale - 0.2 : 0.4)); // Ensure button doesn't get too small

    if (buttonsContainerRef.current && disagreeButtonRef.current) {
      const containerRect = buttonsContainerRef.current.getBoundingClientRect();
      const buttonWidth = disagreeButtonRef.current.offsetWidth; // Use actual button width
      const buttonHeight = disagreeButtonRef.current.offsetHeight; // Use actual button height
      const padding = 20; // Padding to keep button from touching screen edges

      // Calculate movement range within the container
      const maxWidth = containerRect.width - buttonWidth - padding * 2;
      const maxHeight = containerRect.height - buttonHeight - padding * 2;

      // Ensure maxWidth and maxHeight are not negative
      const actualMaxWidth = Math.max(0, maxWidth);
      const actualMaxHeight = Math.max(0, maxHeight);

      const randomTop = Math.floor(Math.random() * actualMaxHeight) + padding;
      const randomLeft = Math.floor(Math.random() * actualMaxWidth) + padding;

      setDisagreePosition({
        top: `${randomTop}px`,
        left: `${randomLeft}px`,
      });
      console.log("Disagree button new position:", { top: randomTop, left: randomLeft }); // Debugging log
    }

    // Change the title to a random one from the list
    const randomIndex = Math.floor(Math.random() * proposalTitles.length);
    const newTitle = proposalTitles[randomIndex];
    setCurrentTitle(newTitle);
    console.log("New title set:", newTitle); // Debugging log
  };

  // Handle "Agree" button click
  const handleAgree = () => {
    setShowModal(true); // Show the success modal
    // Trigger confetti effect
    confetti({
      particleCount: windowSize.width < 640 ? 75 : 150, // Fewer particles on mobile
      spread: 90,
      origin: { y: 0.6, x: 0.5 }, // Confetti originates from the bottom-center
      colors: ['#ff7f50', '#ff6b81', '#ff4757', '#ffa502'], // Romantic colors
    });
  };

  // Handle closing modal and reloading page
  const handleCloseModalAndReload = () => {
    setShowModal(false); // Close the modal
    window.location.reload(); // Reload the page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-rose-200 flex flex-col items-center justify-center relative p-4 font-inter overflow-hidden">
      {/* Main Title */}
      <h1 key={currentTitle} className="text-4xl sm:text-6xl font-extrabold text-pink-700 mb-8 sm:mb-12 text-center drop-shadow-lg animate-pulse">
        {currentTitle} {/* Use the dynamic title here */}
      </h1>

      {/* Container for both buttons - centered by parent */}
      <div
        ref={buttonsContainerRef}
        className="flex flex-col sm:flex-row sm:space-x-8 space-y-6 sm:space-y-0 relative w-full items-center justify-center p-4"
        style={{ minHeight: '200px', minWidth: '300px' }} // Ensure container is large enough for the button to "run"
      >
        {/* Agree Button */}
        <button
          ref={agreeButtonRef}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-8 rounded-full shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95 z-10 text-lg sm:text-xl"
          style={{ transform: `scale(${agreeScale})` }}
          onClick={handleAgree}
        >
          Đồng ý
        </button>

        {/* Disagree Button - Absolutely positioned relative to buttonsContainerRef */}
        <button
          ref={disagreeButtonRef}
          // Added z-20 to ensure it's always on top of the "Đồng ý" button (which has z-10)
          className="bg-gray-400 text-white font-semibold py-3 px-8 rounded-full shadow-md transform transition-all duration-300 ease-out hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 absolute text-lg sm:text-xl z-20"
          style={{
            transform: `scale(${disagreeScale})`,
            top: disagreePosition.top,
            left: disagreePosition.left,
            transition: 'top 0.4s ease-out, left 0.4s ease-out, transform 0.3s ease-out',
            whiteSpace: 'nowrap',
          }}
          onClick={handleDisagree}
        >
          Không đồng ý
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20 backdrop-blur-sm p-4">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl text-center max-w-lg w-full border-4 border-pink-400 transform scale-105 animate-fade-in flex flex-col items-center">
            <h2 className="text-3xl font-extrabold text-pink-600 mb-4">Cảm ơn em nhiều! ❤️</h2>
            {/* Video Player */}
            <video
              className="w-full h-auto rounded-lg shadow-lg mb-6 max-h-96 object-contain"
              controls
              autoPlay
              loop // Loop the video
              src="/video/BeYeu.MP4" // Path to your video file in the public/video folder
              onError={(e) => console.error('Video error:', e)} // Basic error handling
            >
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
            <button
              className="bg-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300"
              onClick={handleCloseModalAndReload} // Call the new handler
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
