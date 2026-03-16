import { Link } from "wouter";

interface ProgressBannerProps {
  questionsCompleted: number;
  totalQuestions?: number;
}

export function ProgressBanner({ 
  questionsCompleted, 
  totalQuestions = 30 
}: ProgressBannerProps) {
  const progressPercentage = (questionsCompleted / totalQuestions) * 100;
  const isComplete = questionsCompleted >= totalQuestions;

  // Calculate North Star brightness based on progress (70% to 100%)
  const starBrightness = 70 + (progressPercentage * 0.3);

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 border-b border-purple-500/20">
      {isComplete ? (
        // Single unified view when complete
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[25vh]">
          <div className="relative w-full max-w-2xl">
            <img 
              src="/globe-with-butterfly-north-star.png" 
              alt="Your North Star - Journey Complete"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-slate-900/80 backdrop-blur-sm px-8 py-6 rounded-lg border border-purple-400/30">
                <h2 className="text-3xl font-bold text-white mb-2">
                  🎉 Journey Complete!
                </h2>
                <p className="text-purple-200 text-lg mb-4">
                  You've discovered your North Star
                </p>
                <Link href="/">
                  <a className="text-purple-300 hover:text-purple-100 underline text-sm">
                    Invite someone else to discover their North Star →
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Two-panel layout showing destination and progress
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[25vh]">
          {/* Left Panel: The Destination */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-purple-200 mb-4">
              The Destination
            </h3>
            <div className="relative w-full max-w-md">
              <img 
                src="/globe-with-butterfly-north-star.png" 
                alt="Your North Star Destination"
                className="w-full h-auto"
                // Destination stays vibrant and bright - no filter applied
              />
            </div>
          </div>

          {/* Right Panel: You Are Here */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-purple-200 mb-4">
              You Are Here
            </h3>
            <div className="relative w-full max-w-md">
              {/* Base globe image - desaturated and faded since journey not complete */}
              <img 
                src="/globe-with-butterfly-north-star.png" 
                alt="Your Current Progress"
                className="w-full h-auto"
                style={{
                  filter: `grayscale(60%) brightness(70%) opacity(0.85)`
                }}
              />
              
              {/* 30-segment clock face overlay */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 400"
                style={{ transform: 'translate(0, 0)' }}
              >
                {/* Draw 30 segments as a clock face */}
                {Array.from({ length: totalQuestions }).map((_, index) => {
                  const angle = (index * 360) / totalQuestions - 90; // Start at top
                  const nextAngle = ((index + 1) * 360) / totalQuestions - 90;
                  const isCompleted = index < questionsCompleted;
                  
                  // Convert to radians
                  const startRad = (angle * Math.PI) / 180;
                  const endRad = (nextAngle * Math.PI) / 180;
                  
                  // Circle parameters (centered on globe)
                  const centerX = 200;
                  const centerY = 200;
                  const radius = 180; // Outer edge of clock
                  const innerRadius = 160; // Inner edge of clock
                  
                  // Calculate arc points
                  const outerStartX = centerX + radius * Math.cos(startRad);
                  const outerStartY = centerY + radius * Math.sin(startRad);
                  const outerEndX = centerX + radius * Math.cos(endRad);
                  const outerEndY = centerY + radius * Math.sin(endRad);
                  const innerStartX = centerX + innerRadius * Math.cos(startRad);
                  const innerStartY = centerY + innerRadius * Math.sin(startRad);
                  const innerEndX = centerX + innerRadius * Math.cos(endRad);
                  const innerEndY = centerY + innerRadius * Math.sin(endRad);
                  
                  // Create path for segment
                  const pathData = [
                    `M ${outerStartX} ${outerStartY}`,
                    `A ${radius} ${radius} 0 0 1 ${outerEndX} ${outerEndY}`,
                    `L ${innerEndX} ${innerEndY}`,
                    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStartX} ${innerStartY}`,
                    'Z'
                  ].join(' ');
                  
                  return (
                    <path
                      key={index}
                      d={pathData}
                      fill={isCompleted ? 'rgba(168, 85, 247, 0.4)' : 'rgba(71, 85, 105, 0.3)'}
                      stroke={isCompleted ? 'rgba(168, 85, 247, 0.8)' : 'rgba(148, 163, 184, 0.4)'}
                      strokeWidth="1"
                    />
                  );
                })}
                
                {/* Add tick marks for better visibility */}
                {Array.from({ length: totalQuestions }).map((_, index) => {
                  const angle = (index * 360) / totalQuestions - 90;
                  const rad = (angle * Math.PI) / 180;
                  const centerX = 200;
                  const centerY = 200;
                  const outerRadius = 180;
                  const tickLength = index % 5 === 0 ? 8 : 4; // Longer tick every 5 segments
                  
                  const x1 = centerX + outerRadius * Math.cos(rad);
                  const y1 = centerY + outerRadius * Math.sin(rad);
                  const x2 = centerX + (outerRadius + tickLength) * Math.cos(rad);
                  const y2 = centerY + (outerRadius + tickLength) * Math.sin(rad);
                  
                  return (
                    <line
                      key={`tick-${index}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(168, 85, 247, 0.6)"
                      strokeWidth={index % 5 === 0 ? "2" : "1"}
                    />
                  );
                })}
              </svg>
              
              {/* Progress text overlay */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="inline-block bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-400/30">
                  <p className="text-white font-semibold text-lg">
                    {questionsCompleted}/{totalQuestions} Questions Complete
                  </p>
                  <p className="text-purple-300 text-sm">
                    {Math.round(progressPercentage)}% of your journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
