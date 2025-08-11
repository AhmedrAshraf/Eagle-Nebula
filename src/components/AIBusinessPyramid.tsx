import React, { useState } from 'react';
import { Edit3, Save } from 'lucide-react';

interface PyramidContent {
  title: string;
  bottomText: string;
  layers: {
    [key: string]: {
      left: string;
      right: string;
    };
  };
}

export const AIBusinessPyramid: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<PyramidContent>({
    title: 'Design Your Business with AI',
    bottomText: 'VISUALIZE VALUE',
    layers: {
      layer1: { left: 'Passion', right: 'Goals & Vision' },
      layer2: { left: 'Fit', right: 'Passion, Knowledge & Experience' },
      layer3: { left: 'Fit', right: 'Goals & Vision' },
      layer4: { left: 'Passion Knowledge & Goals', right: 'Fit' },
      layer5: { left: '', right: '' }
    }
  });

  const handleContentChange = (field: string, value: string) => {
    if (field === 'title' || field === 'bottomText') {
      setContent(prev => ({ ...prev, [field]: value }));
    } else {
      const [layer, side] = field.split('.');
      setContent(prev => ({
        ...prev,
        layers: {
          ...prev.layers,
          [layer]: {
            ...prev.layers[layer],
            [side]: value
          }
        }
      }));
    }
  };

  const EditableText: React.FC<{
    value: string;
    onChange: (value: string) => void;
    className?: string;
    multiline?: boolean;
  }> = ({ value, onChange, className = '', multiline = false }) => {
    if (!isEditing) {
      return <span className={className}>{value}</span>;
    }

    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} bg-white/90 border border-gray-300 rounded p-1 resize-none`}
          rows={2}
        />
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} bg-white/90 border border-gray-300 rounded p-1`}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-8 relative">
      
      {/* Edit Button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
          isEditing 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }`}
      >
        {isEditing ? (
          <>
            <Save className="w-4 h-4" />
            <span>Save</span>
          </>
        ) : (
          <>
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </>
        )}
      </button>

      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
          <EditableText
            value={content.title}
            onChange={(value) => handleContentChange('title', value)}
            multiline
            className="text-center"
          />
        </h1>
      </div>

      {/* 3D Isometric Pyramid */}
      <div className="relative mb-16" style={{ width: '600px', height: '400px' }}>
        
        {/* Layer 5 - Top Triangle */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Left face (gray) */}
            <div 
              className="absolute bg-gray-400"
              style={{
                width: '80px',
                height: '70px',
                clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                transform: 'skewY(-15deg) translateX(-20px)'
              }}
            />
            {/* Right face (white) */}
            <div 
              className="absolute bg-white"
              style={{
                width: '80px',
                height: '70px',
                clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                transform: 'skewY(15deg) translateX(20px)'
              }}
            />
            {/* Top face (light gray) */}
            <div 
              className="absolute bg-gray-300"
              style={{
                width: '80px',
                height: '20px',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
                transform: 'translateY(-10px)'
              }}
            />
            {/* Text on right face */}
            <div className="absolute top-4 right-2 text-black font-semibold text-sm">
              <EditableText
                value={content.layers.layer4.right}
                onChange={(value) => handleContentChange('layer4.right', value)}
              />
            </div>
            {/* Text on left face */}
            <div className="absolute top-4 left-2 text-black font-semibold text-sm">
              <EditableText
                value={content.layers.layer4.left}
                onChange={(value) => handleContentChange('layer4.left', value)}
              />
            </div>
          </div>
        </div>

        {/* Layer 4 */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Black dividing line */}
            <div className="absolute w-32 h-1 bg-black top-0 left-1/2 transform -translate-x-1/2 z-10" />
            
            {/* Left face (gray) */}
            <div 
              className="absolute bg-gray-400"
              style={{
                width: '120px',
                height: '60px',
                transform: 'skewY(-15deg) translateX(-30px)',
                marginTop: '4px'
              }}
            />
            {/* Right face (white) */}
            <div 
              className="absolute bg-white"
              style={{
                width: '120px',
                height: '60px',
                transform: 'skewY(15deg) translateX(30px)',
                marginTop: '4px'
              }}
            />
            {/* Top face (light gray) */}
            <div 
              className="absolute bg-gray-300"
              style={{
                width: '120px',
                height: '25px',
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                transform: 'translateY(0px)'
              }}
            />
            
            {/* Text on right face */}
            <div className="absolute top-6 right-4 text-black font-semibold text-sm">
              <EditableText
                value={content.layers.layer3.right}
                onChange={(value) => handleContentChange('layer3.right', value)}
              />
            </div>
            {/* Text on left face */}
            <div className="absolute top-6 left-4 text-black font-semibold text-sm">
              <EditableText
                value={content.layers.layer3.left}
                onChange={(value) => handleContentChange('layer3.left', value)}
              />
            </div>
          </div>
        </div>

        {/* Layer 3 */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Black dividing line */}
            <div className="absolute w-48 h-1 bg-black top-0 left-1/2 transform -translate-x-1/2 z-10" />
            
            {/* Left face (gray) */}
            <div 
              className="absolute bg-gray-400"
              style={{
                width: '160px',
                height: '70px',
                transform: 'skewY(-15deg) translateX(-40px)',
                marginTop: '4px'
              }}
            />
            {/* Right face (white) */}
            <div 
              className="absolute bg-white"
              style={{
                width: '160px',
                height: '70px',
                transform: 'skewY(15deg) translateX(40px)',
                marginTop: '4px'
              }}
            />
            {/* Top face (light gray) */}
            <div 
              className="absolute bg-gray-300"
              style={{
                width: '160px',
                height: '30px',
                clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                transform: 'translateY(0px)'
              }}
            />
            
            {/* Text on right face */}
            <div className="absolute top-8 right-6 text-black font-semibold text-sm">
              <EditableText
                value={content.layers.layer2.right}
                onChange={(value) => handleContentChange('layer2.right', value)}
                multiline
              />
            </div>
            {/* Text on left face */}
            <div className="absolute top-8 left-6 text-black font-semibold text-sm">
              <EditableText
                value={content.layers.layer2.left}
                onChange={(value) => handleContentChange('layer2.left', value)}
              />
            </div>
          </div>
        </div>

        {/* Layer 2 */}
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Black dividing line */}
            <div className="absolute w-64 h-1 bg-black top-0 left-1/2 transform -translate-x-1/2 z-10" />
            
            {/* Left face (gray) */}
            <div 
              className="absolute bg-gray-400"
              style={{
                width: '200px',
                height: '80px',
                transform: 'skewY(-15deg) translateX(-50px)',
                marginTop: '4px'
              }}
            />
            {/* Right face (white) */}
            <div 
              className="absolute bg-white"
              style={{
                width: '200px',
                height: '80px',
                transform: 'skewY(15deg) translateX(50px)',
                marginTop: '4px'
              }}
            />
            {/* Top face (light gray) */}
            <div 
              className="absolute bg-gray-300"
              style={{
                width: '200px',
                height: '35px',
                clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)',
                transform: 'translateY(0px)'
              }}
            />
            
            {/* Text on right face */}
            <div className="absolute top-10 right-8 text-black font-semibold text-lg">
              <EditableText
                value={content.layers.layer1.right}
                onChange={(value) => handleContentChange('layer1.right', value)}
              />
            </div>
            {/* Text on left face */}
            <div className="absolute top-10 left-8 text-black font-semibold text-lg">
              <EditableText
                value={content.layers.layer1.left}
                onChange={(value) => handleContentChange('layer1.left', value)}
              />
            </div>
          </div>
        </div>

        {/* Layer 1 - Base */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Black dividing line */}
            <div className="absolute w-80 h-1 bg-black top-0 left-1/2 transform -translate-x-1/2 z-10" />
            
            {/* Left face (gray) */}
            <div 
              className="absolute bg-gray-400"
              style={{
                width: '240px',
                height: '60px',
                transform: 'skewY(-15deg) translateX(-60px)',
                marginTop: '4px'
              }}
            />
            {/* Right face (white) */}
            <div 
              className="absolute bg-white"
              style={{
                width: '240px',
                height: '60px',
                transform: 'skewY(15deg) translateX(60px)',
                marginTop: '4px'
              }}
            />
            {/* Top face (light gray) */}
            <div 
              className="absolute bg-gray-300"
              style={{
                width: '240px',
                height: '40px',
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                transform: 'translateY(0px)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-black tracking-wider">
          <EditableText
            value={content.bottomText}
            onChange={(value) => handleContentChange('bottomText', value)}
          />
        </h2>
      </div>
    </div>
  );
};