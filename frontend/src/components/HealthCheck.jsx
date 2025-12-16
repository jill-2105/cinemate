import { useState, useEffect } from "react"
import { checkBackendHealth } from "../utils/api"
import "./HealthCheck.css"

/**
 * HealthCheck component that verifies backend connectivity.
 * Calls the /health endpoint and displays the status.
 */
function HealthCheck() {
  const [status, setStatus] = useState("checking") // "checking", "ok", "error"
  const [message, setMessage] = useState("Checking backend connection...")
  const [lastChecked, setLastChecked] = useState(null)

  const performHealthCheck = async () => {
    setStatus("checking")
    setMessage("Checking backend connection...")
    
    const result = await checkBackendHealth()
    
    if (result.success && result.data?.status === "ok") {
      setStatus("ok")
      setMessage("Backend OK")
      setLastChecked(new Date())
    } else {
      setStatus("error")
      setMessage(result.error || "Backend connection failed")
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    // Auto-check on mount
    performHealthCheck()
  }, [])

  return (
    <div className="health-check-container">
      <button 
        onClick={performHealthCheck}
        className={`health-check-button ${status}`}
        disabled={status === "checking"}
      >
        {status === "checking" && "🔄 Checking..."}
        {status === "ok" && "✓ Backend OK"}
        {status === "error" && "✗ Backend Error"}
      </button>
      <div className="health-check-message">{message}</div>
      {lastChecked && (
        <div className="health-check-timestamp">
          Last checked: {lastChecked.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}

export default HealthCheck
