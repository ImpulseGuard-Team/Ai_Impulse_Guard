import React, { useState } from "react";

export default function InsightPage() {
  const [activeTab, setActiveTab] = useState("Insights");

  const chartData = [20, 40, 60, 80, 50, 30, 70];
  const chartLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const categories = [
    { name: "Entertainment", progress: "75%" },
    { name: "Subscriptions", progress: "60%" },
    { name: "Dining", progress: "45%" },
  ];

  const feedbackCards = [
    {
      id: 1,
      title: "Night Spending",
      text: "Placeholder insight text. Replace with your AI logic later.",
    },
    {
      id: 2,
      title: "Sale Trigger",
      text: "This card is dynamic and rendered properly with React state.",
    },
    {
      id: 3,
      title: "Subscriptions",
      text: "You can replace this with backend or API data later.",
    },
  ];

  const navItems = ["Dashboard", "Insights", "Transactions", "AI Advisor"];

  return (
    <div className="flex min-h-screen bg-[#081029] text-white">
      <aside className="w-64 bg-[#0b1433] p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-semibold mb-8">Impulse Guard</h1>

          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`w-full text-left px-4 py-2 rounded-xl transition ${
                  activeTab === item
                    ? "bg-[#111c44] text-white"
                    : "text-gray-400 hover:bg-[#111c44] hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button className="bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded-xl">
          Upgrade to Pro
        </button>
      </aside>

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">{activeTab}</h2>
          <p className="text-gray-400 text-sm mt-1">
            Your financial patterns decoded.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0f1b3d] rounded-3xl p-6">
            <div className="flex justify-between mb-6">
              <h3 className="font-medium">Spending Velocity</h3>
              <span className="text-green-400 text-sm">
                ↘ 12.4% from last month
              </span>
            </div>

            <div className="flex items-end justify-between h-48 gap-4">
              {chartData.map((h, i) => (
                <div
                  key={chartLabels[i]}
                  className="flex flex-col items-center justify-end flex-1 h-full"
                >
                  <div
                    className={`w-8 rounded-t-lg ${
                      i === 3 ? "bg-cyan-400" : "bg-blue-400/70"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-3">
                    {chartLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0f1b3d] rounded-3xl p-6">
            <h3 className="mb-4">Category Pulse</h3>

            {categories.map((item) => (
              <div key={item.name} className="mb-5">
                <p className="text-sm text-gray-400">{item.name}</p>
                <div className="h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-2 bg-blue-400 rounded-full"
                    style={{ width: item.progress }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackCards.map((card) => (
            <div key={card.id} className="bg-[#0f1b3d] rounded-3xl p-6">
              <h4 className="mb-2 text-white font-medium">{card.title}</h4>
              <p className="text-sm text-gray-400">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0f1b3d] rounded-3xl p-6">
          <h3 className="mb-4">Psychological Profile</h3>
          <p className="text-gray-400 text-sm">
            Reward-driven behavior detected. You spend more after achievements.
          </p>
        </div>
      </main>
    </div>
  );
}