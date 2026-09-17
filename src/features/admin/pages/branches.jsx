import { useState, useEffect } from "react";
import {
  LuBuilding2,
  LuChevronRight,
  LuArrowUpRight,
  LuPlus,
  LuX,
} from "react-icons/lu";

import "../../../styles/admin/branches.css";

export default function Branches() {
  // =========================
  // Branches Data
  // =========================
  const [branches, setBranches] = useState([
    {
      id: "cairo",
      name: "Cairo HQ",
      coordinates: "30.0444° N, 31.2357° E",
      radius: "100m radius",
      gpsEnforced: true,
    },
    {
      id: "alexandria",
      name: "Alexandria Hub",
      coordinates: "31.2001° N, 29.9187° E",
      radius: "100m radius",
      gpsEnforced: true,
    },
  ]);

  // =========================
  // Modal State
  // =========================
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // =========================
  // Form State
  // =========================
  const [branchName, setBranchName] = useState("");

  const [gpsCoordinates, setGpsCoordinates] = useState(
    "30.0444° N, 31.2357° E",
  );

  const [geofenceRadius, setGeofenceRadius] = useState("100");

  // =========================
  // Close Modal with Escape
  // =========================
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsAddModalOpen(false);
      }
    };

    if (isAddModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAddModalOpen]);

  // =========================
  // Toggle GPS
  // =========================
  const handleToggleGps = (branchId) => {
    setBranches((previousBranches) =>
      previousBranches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              gpsEnforced: !branch.gpsEnforced,
            }
          : branch,
      ),
    );
  };

  // =========================
  // Add New Branch
  // =========================
  const handleAddBranchSubmit = (event) => {
    event.preventDefault();

    if (!branchName.trim()) {
      return;
    }

    const newBranch = {
      id: `branch-${Date.now()}`,

      name: branchName.trim(),

      coordinates: gpsCoordinates.trim() || "30.0444° N, 31.2357° E",

      radius: `${geofenceRadius.trim() || "100"}m radius`,

      gpsEnforced: true,
    };

    setBranches((previousBranches) => [...previousBranches, newBranch]);

    // Reset form
    setBranchName("");

    setGpsCoordinates("30.0444° N, 31.2357° E");

    setGeofenceRadius("100");

    // Close modal
    setIsAddModalOpen(false);
  };

  // =========================
  // Export Branches Config
  // =========================
  const handleExportConfig = () => {
    const data =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(branches, null, 2));

    const downloadAnchor = document.createElement("a");

    downloadAnchor.href = data;

    downloadAnchor.download = "wisework_branches_config.json";

    document.body.appendChild(downloadAnchor);

    downloadAnchor.click();

    downloadAnchor.remove();
  };

  // =========================
  // JSX
  // =========================
  return (
    <>
      {/* =====================================================
          BRANCHES PAGE
      ===================================================== */}

      <div className="branches-page-wrapper">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="branches-header">
          {/* Header Left */}
          <div>
            {/* Breadcrumb */}
            <div className="branches-breadcrumb">
              <span>WiseWork</span>

              <LuChevronRight size={14} />

              <span className="branches-breadcrumb-current">Branches</span>
            </div>

            {/* Page Title */}
            <h1 className="branches-title">Branches</h1>

            {/* Page Subtitle */}
            <p className="branches-subtitle">
              Configure and manage your WiseWork branches.
            </p>
          </div>

          {/* Export Button */}
          <button
            type="button"
            className="branches-export-btn"
            onClick={handleExportConfig}
          >
            <LuArrowUpRight size={17} />

            <span>Export Config</span>
          </button>
        </div>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <div className="branches-main-card">
          {/* Card Header */}
          <div className="branches-card-header">
            {/* Card Information */}
            <div>
              <h2 className="branches-card-title">Branch locations</h2>

              <p className="branches-card-desc">
                Configure GPS enforcement for each branch
              </p>
            </div>

            {/* Add Branch Button */}
            <button
              type="button"
              className="branches-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              <LuPlus size={17} />

              <span>Add Branch</span>
            </button>
          </div>

          {/* =====================================================
              BRANCHES GRID
          ===================================================== */}

          <div className="branches-grid">
            {branches.map((branch) => (
              <div className="branch-item-card" key={branch.id}>
                {/* =================================================
                    TOP ROW
                ================================================= */}

                <div className="branch-top-row">
                  {/* Branch Information */}
                  <div className="branch-info-group">
                    {/* Branch Icon */}
                    <div className="branch-icon-box">
                      <LuBuilding2 size={21} />
                    </div>

                    {/* Branch Name + Coordinates */}
                    <div>
                      <h3 className="branch-name">{branch.name}</h3>

                      <p className="branch-coords">{branch.coordinates}</p>
                    </div>
                  </div>

                  {/* Radius Badge */}
                  <div className="branch-radius-badge">
                    <span className="branch-radius-dot"></span>

                    <span>{branch.radius}</span>
                  </div>
                </div>

                {/* =================================================
                    BOTTOM GPS ROW
                ================================================= */}

                <div className="branch-bottom-row">
                  {/* GPS Information */}
                  <div>
                    <p className="branch-gps-label">GPS enforcement</p>

                    <p className="branch-gps-desc">
                      Require employees to be within the branch
                    </p>
                  </div>

                  {/* GPS Switch */}
                  <button
                    type="button"
                    className={`branch-switch ${
                      branch.gpsEnforced ? "switch-on" : "switch-off"
                    }`}
                    onClick={() => handleToggleGps(branch.id)}
                    aria-label={`Toggle GPS enforcement for ${branch.name}`}
                    aria-pressed={branch.gpsEnforced}
                  >
                    <span className="branch-switch-knob"></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          ADD BRANCH MODAL
      ===================================================== */}

      {isAddModalOpen && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            // Close modal when clicking outside
            if (event.target === event.currentTarget) {
              setIsAddModalOpen(false);
            }
          }}
        >
          <div className="modal-dialog">
            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="modal-header">
              <h2 className="modal-title">Add New Branch</h2>

              {/* Close Button */}
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close modal"
              >
                <LuX size={20} />
              </button>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form className="modal-form" onSubmit={handleAddBranchSubmit}>
              {/* =================================================
                  BRANCH NAME
              ================================================= */}

              <div className="modal-field-group">
                <label htmlFor="branch-name" className="modal-field-label">
                  Branch name
                </label>

                <input
                  id="branch-name"
                  type="text"
                  className="modal-input"
                  placeholder="e.g. Cairo HQ"
                  value={branchName}
                  onChange={(event) => setBranchName(event.target.value)}
                  required
                />
              </div>

              {/* =================================================
                  GPS COORDINATES
              ================================================= */}

              <div className="modal-field-group">
                <label htmlFor="gps-coordinates" className="modal-field-label">
                  GPS coordinates
                </label>

                <input
                  id="gps-coordinates"
                  type="text"
                  className="modal-input"
                  placeholder="30.0444° N, 31.2357° E"
                  value={gpsCoordinates}
                  onChange={(event) => setGpsCoordinates(event.target.value)}
                />
              </div>

              {/* =================================================
                  GEOFENCE RADIUS
              ================================================= */}

              <div className="modal-field-group">
                <label htmlFor="geofence-radius" className="modal-field-label">
                  Geofence radius (meters)
                </label>

                <input
                  id="geofence-radius"
                  type="number"
                  min="1"
                  className="modal-input"
                  placeholder="100"
                  value={geofenceRadius}
                  onChange={(event) => setGeofenceRadius(event.target.value)}
                />
              </div>

              {/* =================================================
                  MODAL FOOTER
              ================================================= */}

              <div className="modal-footer">
                {/* Cancel */}
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>

                {/* Submit */}
                <button type="submit" className="modal-btn-submit">
                  Add Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
