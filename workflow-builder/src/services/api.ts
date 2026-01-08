import type {
  WorkflowRequest,
  WorkflowResponse,
} from "../types/workflow.types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const executeWorkflow = async (
  workflowRequest: WorkflowRequest
): Promise<WorkflowResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/workflow/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workflowRequest),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error executing workflow:", error);
    throw error;
  }
};

export const validateWorkflow = async (
  workflowRequest: WorkflowRequest
): Promise<{ valid: boolean; errors?: string[] }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workflowRequest),
    });

    if (!response.ok) {
      throw new Error(`Validation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error validating workflow:", error);
    return {
      valid: false,
      errors: ["Failed to connect to validation service"],
    };
  }
};
