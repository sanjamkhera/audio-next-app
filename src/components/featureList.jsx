"use client"

const FeatureList = () => {
  return (
    <div className="flex flex-col flex-grow bg-black text-white p-8">
      <ul className="space-y-4">
        <li className="text-lg">
          <strong>*24 hour delivery</strong> (usually less), or money back guaranteed
        </li>
        <hr className="border-gray-700" />
        <li className="text-lg">
          <strong>3-5 high-fidelity screens</strong> (max) plus 1 round of revisions
        </li>
        <hr className="border-gray-700" />
        <li className="text-lg">
          Secure access to <strong>project tracker</strong> to follow live progress
        </li>
        <hr className="border-gray-700" />
        <li className="text-lg">
          Interactive, <u>clickable Figma prototypes</u> + artboard access
        </li>
        <hr className="border-gray-700" />
        <li className="text-lg">
          <strong>Full-rights</strong> to all digital designs, fonts and assets
        </li>
        <hr className="border-gray-700" />
        <li className="text-gray-400 text-sm">
          <em>Coming soon:</em> Code export, animations, project history, client dashboard, downloads & more
        </li>
      </ul>
      <div className="mt-8 flex flex-col items-center space-y-4">
        <button className="bg-gray-600 text-white py-2 px-6 rounded-lg flex items-center justify-center">
          <i className="fab fa-linkedin-in mr-2"></i> Share on LinkedIn
        </button>
        <button className="bg-purple-600 text-white py-2 px-6 rounded-lg flex items-center justify-center">
          <i className="fas fa-qrcode mr-2"></i> Save to home screen
        </button>
      </div>
    </div>
  );
};

export default FeatureList;
