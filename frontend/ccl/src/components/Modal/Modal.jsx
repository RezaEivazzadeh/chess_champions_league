import React from 'react';
import './Modal.css';

// Base Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

// Difficulty Selection Modal
const DifficultyModal = ({ onSelectDifficulty, onClose }) => {
  const difficulties = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'medium', label: 'Medium' },
    { id: 'expert', label: 'Expert' },
    { id: 'random', label: 'Random' }
  ];

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="modal-header">
        <h2>Select Difficulty</h2>
      </div>
      <div className="modal-body">
        <div className="difficulty-options">
          {difficulties.map(difficulty => (
            <button
              key={difficulty.id}
              className="difficulty-button"
              onClick={() => onSelectDifficulty(difficulty.id)}
            >
              {difficulty.label}
            </button>
          ))}
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-button cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

// Confirmation Modal for Active Game
const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <Modal isOpen={true} onClose={onCancel}>
      <div className="modal-header warning">
        <h2>Active Game in Progress</h2>
      </div>
      <div className="modal-body">
        <p>By opening a new game, you will surrender and lose the current game.</p>
        <p>Do you want to continue?</p>
      </div>
      <div className="modal-footer">
        <button className="modal-button cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button className="modal-button confirm-button" onClick={onConfirm}>
          Surrender & New Game
        </button>
      </div>
    </Modal>
  );
};

export { Modal, DifficultyModal, ConfirmationModal };