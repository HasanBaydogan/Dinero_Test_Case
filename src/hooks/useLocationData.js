import { useState, useEffect, useCallback } from "react";
import { REDUCER_ACTIONS, useFormDispatch } from "../state/FormContext";
import { getProvinces, getDistricts } from "../services/apiService";

export const useLocationData = (formState) => {
  const dispatch = useFormDispatch();
  const [provinces, setProvinces] = useState([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);

  // Load provinces on component mount
  useEffect(() => {
    const loadProvinces = async () => {
      setIsLoadingProvinces(true);
      try {
        const result = await getProvinces();
        if (result.success) {
          setProvinces(result.data);
        } else {
          console.error("Failed to load provinces:", result.message);
        }
      } catch (error) {
        console.error("Error loading provinces:", error);
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    loadProvinces();
  }, []);

  // Load districts when province changes
  const loadDistricts = useCallback(async (provinceId) => {
    if (!provinceId) {
      setDistricts([]);
      return;
    }

    setIsLoadingDistricts(true);
    try {
      const result = await getDistricts(provinceId);
      if (result.success) {
        setDistricts(result.data);
      } else {
        console.error("Failed to load districts:", result.message);
        setDistricts([]);
      }
    } catch (error) {
      console.error("Error loading districts:", error);
      setDistricts([]);
    } finally {
      setIsLoadingDistricts(false);
    }
  }, []);

  // Handle province change
  const handleProvinceChange = useCallback(
    (e) => {
      const { value } = e.target;

      // Update province
      dispatch({
        type: REDUCER_ACTIONS.UPDATE_INPUT,
        field: "city",
        payload: value,
      });

      // Clear district when province changes
      dispatch({
        type: REDUCER_ACTIONS.UPDATE_INPUT,
        field: "district",
        payload: "",
      });
      dispatch({
        type: REDUCER_ACTIONS.CLEAR_ERROR,
        field: "district",
      });

      // Load districts for selected province
      if (value) {
        loadDistricts(value);
      } else {
        setDistricts([]);
      }
    },
    [dispatch, loadDistricts]
  );

  // Clear districts when address is toggled off
  useEffect(() => {
    if (!formState.includeAddress) {
      setDistricts([]);
      setIsLoadingDistricts(false);
    }
  }, [formState.includeAddress]);

  return {
    provinces,
    districts,
    isLoadingProvinces,
    isLoadingDistricts,
    handleProvinceChange,
  };
};
