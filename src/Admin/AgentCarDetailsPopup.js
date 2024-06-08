import React, { useRef, useState, useEffect } from "react";
import { AgentNav } from "./AgentNav";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom"; // import useParams
import api from "../api";
export const AgentCarDetailsPopup = () => {
  const stepRefs = useRef([]);
  const navigate = useNavigate();
  const [notableinspect, setNotAbleInspect] = useState(false);
  const [postinspect, setPostInspect] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [vechiclevideo, setVechicleVideo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreviews, setImagePreviews] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { Vehicle_Id } = useParams(); // Get the ID from the URL slug
  const [inspectionReport, setInspectionReport] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [sellerid, setSeller] = useState("");
  const [vechicleid, setVehicleId] = useState("");
  const [highestbid, setHighestBid] = useState("");
  const [location, setLocation] = useState("");
  const [vin, setVin] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [mileage, setMileage] = useState("");
  const [color, setColor] = useState("");
  const [keys, setkeys] = useState("");
  const [settire, setSetTire] = useState("");
  const [windowtint, setWindowTint] = useState("");
  const [aftermarketexhaust, setAftermarketExhaust] = useState("");
  const [aftermarkrims, setAftermarkRims] = useState("");
  const [roofrack, setRoofRack] = useState("");
  const [remotestarter, setRemoteStarter] = useState("");
  const [aftermarkstereo, setAftermarkStereo] = useState("");
  const [aftermarketspoiler, setAftermarketSpoiler] = useState("");
  const [minordamage, setMinorDamage] = useState("");
  const [interiorimage, setInteriorImage] = useState("");
  const [interiorimagetwo, setInteriorImageTwo] = useState("");
  const [interiorimagethree, setInteriorImageThree] = useState("");
  const [interiorimagefour, setInteriorImageFour] = useState("");
  const [exteriorimage, setExteriorImage] = useState("");
  const [exteriorimagetwo, setExteriorImageTwo] = useState("");
  const [exteriorimagethree, setExteriorImageThree] = useState("");
  const [exteriorimagefour, setExteriorImageFour] = useState("");
  const [dashboardimage, setDashboardImage] = useState("");
  const [dashboardimagetwo, setDashboardImageTwo] = useState("");
  const [dashboardimagethree, setDashboardImageThree] = useState("");
  const [dashboardimagefour, setDashboardImageFour] = useState("");
  const [rimsimage, setRimsImage] = useState("");
  const [rimsimagetwo, setRimsImageTwo] = useState("");
  const [rimsimagethree, setRimsImageThree] = useState("");
  const [rimsimagefour, setRimsImageFour] = useState("");
  const [fadingpaints, setFadingPaints] = useState("");
  const [rust, setRust] = useState("");
  const [haildamage, setHailDamage] = useState("");
  const [extmintcondition, setExtMintCondition] = useState("");
  const [dents, setDents] = useState("");
  const [ripsOrTears, setRipsOrTears] = useState(false);
  const [visibleStain, setVisibleStain] = useState(false);
  const [strongSmell, setStrongSmell] = useState(false);
  const [damagedSystems, setDamagedSystems] = useState(false);
  const [IntmintCondition, setIntMintCondition] = useState(false);
  const [smokeInVehicle, setSmokeInVehicle] = useState(false);
  const [hasOriginalRims, setHasOriginalRims] = useState(null);
  const [tireReplacement, setTireReplacement] = useState(null);
  const [vehicleDrivable, setVehicleDrivable] = useState(null);
  const [crackOnWindshield, setCrackOnWindshield] = useState(null);
  const [extendedWarranty, setExtendedWarranty] = useState(null);
  const [tradeInInterest, setTradeInInterest] = useState(null);
  const [hasWinterTires, setHasWinterTires] = useState(null);
  const [sellTiming, setSellTiming] = useState("");
  const [DonotNeedCar, setDonotNeedCar] = useState("");
  const [MechElectIssues, setMechElectIssues] = useState("");
  const [DownSize, setDownSize] = useState("");
  const [BuyAnotherCar, setBuyAnotherCar] = useState("");
  const [carCondition, setCarCondition] = useState("");
  const [accidentclaims, setAccidentClaims] = useState("");
  const [howmuchclaims, setHowMuchClaims] = useState("");
  const [carrims, setCarRims] = useState("");
  const [stockrim, setStockRim] = useState("");
  const [issuevichle, setIssueVichle] = useState("");
  const [issuevichledecs, setIssueVichleDecs] = useState("");
  const [carmodify, setCarMdify] = useState("");
  const [carmodifydecs, setCarMdifyDecs] = useState("");
  const [financed, setFinanced] = useState("");
  const [financeddesc, setFinancedDesc] = useState("");
  const [reason, setReason] = useState("");
  const [vehicledrivabledesc, setVehicleDrivableDes] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const features = [
    settire,
    windowtint,
    aftermarketexhaust,
    roofrack,
    remotestarter,
    aftermarkstereo,
    aftermarketspoiler,
  ];
  const filteredFeatures = features.filter((feature) => feature);
  const featuresString = filteredFeatures.join(",");

  const featurestwo = [
    minordamage,
    fadingpaints,
    rust,
    haildamage,
    extmintcondition,
    dents,
  ];
  const filteredFeaturestwo = featurestwo.filter((feature) => feature);
  const featuresStringtwo = filteredFeaturestwo.join(",");

  const featuresthree = [
    ripsOrTears,
    visibleStain,
    strongSmell,
    damagedSystems,
    IntmintCondition,
  ];
  const filteredFeaturesthree = featuresthree.filter((feature) => feature);
  const featuresStringthree = filteredFeaturesthree.join(",");

  useEffect(() => {
    if (
      Vehicle_Id &&
      (interiorimage ||
        interiorimagetwo ||
        interiorimagethree ||
        interiorimagefour ||
        exteriorimage ||
        dashboardimage ||
        dashboardimagetwo ||
        dashboardimagethree ||
        dashboardimagefour ||
        rimsimage ||
        rimsimagetwo ||
        rimsimagethree ||
        rimsimagefour)
    ) {
      initializeFlexSlider();
    }
  }, [
    Vehicle_Id,
    interiorimage,
    interiorimagetwo,
    interiorimagethree,
    interiorimagefour,
    exteriorimage,
    dashboardimage,
    rimsimage,
  ]);

  const fetchData = async () => {
    try {
      const response = await api.get(`/seller/vehicle/${Vehicle_Id}`);
      const vehicleData = response.data;
      setSeller(vehicleData.vehicle.Seller_Id);
      setLocation(vehicleData.vehicle.Location || "");
      setHighestBid(vehicleData.HighestBid);
      setVin(vehicleData.vehicle.VIN || "");
      setYear(vehicleData.vehicle.Year || "");
      setMake(vehicleData.vehicle.Make || "");
      setModel(vehicleData.vehicle.Model || "");
      setTrim(vehicleData.vehicle.Trim || "");
      setMileage(vehicleData.vehicle.Mileage || "");
      setColor(vehicleData.vehicle.Color || "");
      setkeys(vehicleData.vehicle.Car_Keys || "");
      setSetTire(vehicleData.vehicle["2_Sets_Of_Tire"] || "");
      setWindowTint(vehicleData.vehicle["Win_Tint"] || "");
      setAftermarketExhaust(vehicleData.vehicle["Aftermark_Exhaust"] || "");
      setAftermarkRims(vehicleData.vehicle["Aftermark_Rims"] || "");
      setRoofRack(vehicleData.vehicle["Roof_Rack"] || "");
      setRemoteStarter(vehicleData.vehicle["Remote_Start"] || "");
      setRemoteStarter(vehicleData.vehicle["Remote_Start"] || "");
      setAftermarkStereo(vehicleData.vehicle["Aftermark_Stereo"] || "");
      setAftermarketSpoiler(vehicleData.vehicle["Aftermark_Spoiler"] || "");
      setMinorDamage(vehicleData.vehicle["Minor_Damage"] || "");
      setInteriorImage(vehicleData.vehicle["Interior_Image"] || "");
      setInteriorImageTwo(vehicleData.vehicle["Interior_Image2"] || "");
      setInteriorImageThree(vehicleData.vehicle["Interior_Image3"] || "");
      setInteriorImageFour(vehicleData.vehicle["Interior_Image4"] || "");
      setExteriorImage(vehicleData.vehicle["Exterior_Image"] || "");
      setExteriorImageTwo(vehicleData.vehicle["Exterior_Image2"] || "");
      setExteriorImageThree(vehicleData.vehicle["Exterior_Image3"] || "");
      setExteriorImageFour(vehicleData.vehicle["Exterior_Image4"] || "");
      setDashboardImage(vehicleData.vehicle["Dashboard_Image"] || "");
      setDashboardImageTwo(vehicleData.vehicle["Dashboard_Image2"] || "");
      setDashboardImageThree(vehicleData.vehicle["Dashboard_Image3"] || "");
      setDashboardImageFour(vehicleData.vehicle["Dashboard_Image4"] || "");
      setRimsImage(vehicleData.vehicle["Rims_Image"] || "");
      setRimsImageTwo(vehicleData.vehicle["Rims_Image2"] || "");
      setRimsImageThree(vehicleData.vehicle["Rims_Image3"] || "");
      setRimsImageFour(vehicleData.vehicle["Rims_Image4"] || "");
      setFadingPaints(vehicleData.vehicle["Fading_Paints"] || "");
      setRust(vehicleData.vehicle["Rust"] || "");
      setHailDamage(vehicleData.vehicle["Hail_Damage"] || "");
      setExtMintCondition(vehicleData.vehicle["Ext_Mint_Condition"] || "");
      setDents(vehicleData.vehicle["Dents"] || "");
      setRipsOrTears(vehicleData.vehicle["Seats_Rips_Tears"] || "");
      setVisibleStain(vehicleData.vehicle["Seats_Visible_Stain"] || "");
      setStrongSmell(vehicleData.vehicle["Strong_Smell"] || "");
      setDamagedSystems(vehicleData.vehicle["Nav_Entmt_Ctrl_Dmg_Sys"] || "");
      setIntMintCondition(vehicleData.vehicle["Int_Mint_Condition"] || "");
      setSmokeInVehicle(vehicleData.vehicle["Smoke_In_Vehicle"] || "No");
      setHasOriginalRims(vehicleData.vehicle["Original_Factory_Rims"] || "No");
      setTireReplacement(vehicleData.vehicle["Tires_Repld_12_Months"] || "No");
      setVehicleDrivable(vehicleData.vehicle["Vehicle_Drivable"] || "No");
      setCrackOnWindshield(vehicleData.vehicle["Windshield_Crack"] || "No");
      setExtendedWarranty(vehicleData.vehicle["Extended_Warranty"] || "No");
      setTradeInInterest(vehicleData.vehicle["TradeIn_Interested"] || "No");
      setHasWinterTires(vehicleData.vehicle["Winter_Tires"] || "No");
      setSellTiming(vehicleData.vehicle["How_Soon_Ready_Sell"]);
      setDonotNeedCar(vehicleData.vehicle["Donot_Need_Car"] || "");
      setMechElectIssues(vehicleData.vehicle["Mech_Elect_Issues"] || "");
      setDownSize(vehicleData.vehicle["Downsize"] || "");
      setBuyAnotherCar(vehicleData.vehicle["Buy_Another_Car"] || "");
      setCarCondition(vehicleData.vehicle["Car_Condition"]);
      setAccidentClaims(vehicleData.vehicle["Accident_Claims"] || "No");
      setHowMuchClaims(vehicleData.vehicle["How_Much_Claims"] || "");
      setCarRims(vehicleData.vehicle["Car_Rims"]);
      setStockRim(vehicleData.vehicle["Stock_Rims"] || "No");
      setIssueVichle(vehicleData.vehicle["Any_Vehicle_Issues"] || "No");
      setIssueVichleDecs(vehicleData.vehicle["Vehicle_Issues_desc"] || "");
      setCarMdify(vehicleData.vehicle["Car_Modification"] || "No");
      setCarMdifyDecs(vehicleData.vehicle["Modification_desc"] || "");
      setFinanced(vehicleData.vehicle["Leased_Financed"] || "No");
      setFinancedDesc(vehicleData.vehicle["Financed_By"] || "");
      setVehicleId(vehicleData.vehicle["Vehicle_Id"]);
      setVehicleDrivableDes(
        vehicleData.vehicle["vehicle_drivable_not_explanation"]
      );
      setVechicleVideo(vehicleData.vehicle["Vehicle_video"]);
      if (vehicleData.vehicle["Leased_Financed"] === 1) {
        setFinanced("Yes");
      }
      if (vehicleData.vehicle["Car_Modification"] === 1) {
        setCarMdify("Yes");
      }
      if (vehicleData.vehicle["Any_Vehicle_Issues"] === 1) {
        setIssueVichle("Yes");
      }

      if (vehicleData.vehicle["Stock_Rims"] === 1) {
        setStockRim("Yes");
      }
      if (vehicleData.vehicle["Accident_Claims"] === 1) {
        setAccidentClaims("Yes");
      }
      if (vehicleData.vehicle["Donot_Need_Car"] === 1) {
        setDonotNeedCar("Don’t Need The Car Anymore");
      }
      if (vehicleData.vehicle["Mech_Elect_Issues"] === 1) {
        setMechElectIssues(
          "Selling Because The Car Has Some Mechanical/ Electrical Issues"
        );
      }
      if (vehicleData.vehicle["Downsize"] === 1) {
        setDownSize("Selling To Downsize");
      }
      if (vehicleData.vehicle["Buy_Another_Car"] === 1) {
        setBuyAnotherCar("Selling To Buy Another Car");
      }
      if (vehicleData.vehicle["Winter_Tires"] === 1) {
        setHasWinterTires("Yes");
      }
      if (vehicleData.vehicle["TradeIn_Interested"] === 1) {
        setTradeInInterest("Yes");
      }
      if (vehicleData.vehicle["Extended_Warranty"] === 1) {
        setExtendedWarranty("Yes");
      }
      if (vehicleData.vehicle["Windshield_Crack"] === 1) {
        setCrackOnWindshield("Yes");
      }
      if (vehicleData.vehicle["Vehicle_Drivable"] === 1) {
        setVehicleDrivable("Yes");
      }
      if (vehicleData.vehicle["Tires_Repld_12_Months"] === 1) {
        setTireReplacement("Yes");
      }
      if (vehicleData.vehicle["Original_Factory_Rims"] === 1) {
        setHasOriginalRims("Yes");
      }
      if (vehicleData.vehicle["Original_Factory_Rims"] === 1) {
        setHasOriginalRims("Yes");
      }
      if (vehicleData.vehicle["Smoke_In_Vehicle"] === 1) {
        setSmokeInVehicle("Yes");
      }
      if (vehicleData.vehicle["2_Sets_Of_Tire"] === 1) {
        setSetTire("2 Sets of Tire");
      }
      if (vehicleData.vehicle["Win_Tint"] === 1) {
        setWindowTint("Window Tint");
      }
      if (vehicleData.vehicle["Aftermark_Exhaust"] === 1) {
        setAftermarketExhaust("Aftermarket Exhaust");
      }
      if (vehicleData.vehicle["Aftermark_Rims"] === 1) {
        setAftermarkRims("Aftermarket Rims");
      }
      if (vehicleData.vehicle["Roof_Rack"] === 1) {
        setRoofRack("Roof Rack");
      }
      if (vehicleData.vehicle["Remote_Start"] === 1) {
        setRemoteStarter("Remote Start");
      }
      if (vehicleData.vehicle["Aftermark_Stereo"] === 1) {
        setAftermarkStereo("Aftermarket Stereo");
      }
      if (vehicleData.vehicle["Aftermark_Spoiler"] === 1) {
        setAftermarketSpoiler("Aftermarket Spoiler");
      }
      if (vehicleData.vehicle["Minor_Damage"] === 1) {
        setMinorDamage("Minor Damage");
      }
      if (vehicleData.vehicle["Fading_Paints"] === 1) {
        setFadingPaints("Fading Paints");
      }
      if (vehicleData.vehicle["Rust"] === 1) {
        setRust("Rust");
      }
      if (vehicleData.vehicle["Hail_Damage"] === 1) {
        setHailDamage("Hail Damage");
      }
      if (vehicleData.vehicle["Ext_Mint_Condition"] === 1) {
        setExtMintCondition("Mint Condition");
      }
      if (vehicleData.vehicle["Dents"] === 1) {
        setDents("Dents");
      }
      if (vehicleData.vehicle["Int_Mint_Condition"] === 1) {
        setIntMintCondition("Mint Condition");
      }
      if (vehicleData.vehicle["Nav_Entmt_Ctrl_Dmg_Sys"] === 1) {
        setDamagedSystems("Damaged Systems");
      }
      if (vehicleData.vehicle["Strong_Smell"] === 1) {
        setStrongSmell("Strong Smell");
      }
      if (vehicleData.vehicle["Seats_Visible_Stain"] === 1) {
        setVisibleStain("Visible Stain On The Seats");
      }
      if (vehicleData.vehicle["Seats_Rips_Tears"] === 1) {
        setRipsOrTears("Rips Or Tears On The Seats");
      }
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };
  const handleSubmit = async (event, status) => {
    event.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    try {
      const response = await api.post("/agent/postinspectionreport", {
        Vehicle_Id: Vehicle_Id,
        Inspection_Status: status,
        Inspection_Report: inspectionReport,
        Inspection_Date: formattedDate,
      });
      // Handle success
      setPostInspect(true);
      
      setTimeout(() => {
        navigate('/agent-car-inspection');
      }, 2000);
    } catch (error) {
      // Handle error
      console.error("Error posting inspection report:", error);
    }
  };

  const handleSubmitNotAbleToInspect = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/agent/notabletoinspect", {
        Vehicle_Id: Vehicle_Id,
        NotAble_Inspect_Comments: reason,
      });

      // Handle success
      setTimeout(() => {
        navigate('/agent-car-inspection');
      }, 2000);
      
    } catch (error) {
      // Handle error
      console.error("Error posting reason for not able to inspect:", error);
    }
  };

  const initializeFlexSlider = () => {
    window.$(".flexslider").flexslider({
      animation: "slide",
      controlNav: "thumbnails",
      start: function (slider) {
        window.$("body").removeClass("loading");
      },
    });
  };
  const handleClick = () => {
    // Extract the vehicle ID from the URL
    const url = window.location.href;
    const urlParts = url.split("/");
    const vehicleId = urlParts[urlParts.length - 1]; // Assuming vehicle ID is the last part of the URL

    // Store the vehicle ID in session storage
    sessionStorage.setItem("Vehicle_Id", vehicleId);

    // Log the session value
    const sessionValue = sessionStorage.getItem("Vehicle_Id");
  };
  const handleSaveBid = async () => {
    if (!bidPrice) {
      alert("Please enter a bid price");
      return;
    }

    try {
      setLoading(true); // Set loading to true before making the request
      const dealerId = sessionStorage.getItem("user_id");
      const response = await api.post("/dealer/dealerbidprice", {
        Bid_Amount: bidPrice,
        Dealer_Id: dealerId,
        Vehicle_Id: vechicleid,
      });
      if (response.data && response.data.message) {
        setResponseMessage(response.data.message); // Set the response message if available
      } else {
        setResponseMessage("Bid price saved successfully");
      }

      setLoading(false); // Set loading to false after the request completes
    } catch (error) {
      console.error("Error saving bid price:", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };
  const handleChange = (event) => {
    setInspectionReport(event.target.value);
    setReason(event.target.value);
  };
  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file type is supported (e.g., image/jpeg, image/png)
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        // Handle unsupported file type error
        console.error(
          "Unsupported file type. Please select a JPEG or PNG image."
        );
        return;
      }

      // Check if the file size exceeds the limit (in bytes)
      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSize) {
        // Handle file size limit exceeded error
        console.error(
          "File size limit exceeded. Please select a smaller image."
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    } else {
      // Handle no file selected error
      console.error("No file selected.");
    }
  };

  const handleSubmitimage = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(); // Create a new FormData object
      formData.append("Seller_Id", sellerid);

      imagePreviews.forEach((preview, index) => {
        if (preview) {
          // Get the file from the inputRefs
          const file = inputRefs.current[index].files[0];

          if (!file) {
            console.error(`No file selected for image ${index + 1}`);
            return;
          }
          // Append the file to formData with the appropriate variable name
          if (index === 0) {
            formData.append("Interior_Image", file);
          } else if (index === 1) {
            formData.append("Exterior_Image", file);
          } else if (index === 2) {
            formData.append("Dashboard_Image", file);
          } else if (index === 3) {
            formData.append("Rims_Image", file);
          }
        }
      });

      const response = await api.post(
        `/agent/agentupdateimages/${Vehicle_Id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );
      setUploadSuccess(true);
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error uploading vehicle details:", error);
      setErrorMessage("Error uploading images. Please try again."); // Set error message
      setUploadSuccess(false); // Set upload success to false
      // Handle error
    }
  };
  return (
    <section class="car-details">
      <AgentNav />
      <div class="container mt-5">
        <h3 class="main-heading pt-4"> View Car Deatils</h3>
        <div class="row py-3">
          <div class="col-md-6">
            <div class="car-list-image">
              <div class="flexslider">
                <ul className="slides">
                  {interiorimage && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${interiorimage}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${interiorimage}`}
                        alt="Interior"
                      />
                    </li>
                  )}
                  {interiorimagetwo && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${interiorimagetwo}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${interiorimagetwo}`}
                        alt="Interior"
                      />
                    </li>
                  )}
                  {interiorimagethree && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${interiorimagethree}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${interiorimagethree}`}
                        alt="Interior"
                      />
                    </li>
                  )}
                  {interiorimagefour && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${interiorimagefour}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${interiorimagefour}`}
                        alt="Interior"
                      />
                    </li>
                  )}
                  {exteriorimage && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${exteriorimage}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${exteriorimage}`}
                        alt="Exterior"
                      />
                    </li>
                  )}
                  {exteriorimagetwo && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${exteriorimagetwo}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${exteriorimagetwo}`}
                        alt="Exterior"
                      />
                    </li>
                  )}
                  {exteriorimagethree && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${exteriorimagethree}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${exteriorimagethree}`}
                        alt="Exterior"
                      />
                    </li>
                  )}
                  {exteriorimagefour && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${exteriorimagefour}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${exteriorimagefour}`}
                        alt="Exterior"
                      />
                    </li>
                  )}
                  {dashboardimage && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${dashboardimage}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${dashboardimage}`}
                        alt="Dashboard"
                      />
                    </li>
                  )}
                  {dashboardimagetwo && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${dashboardimagetwo}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${dashboardimagetwo}`}
                        alt="Dashboard"
                      />
                    </li>
                  )}
                  {dashboardimagethree && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${dashboardimagethree}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${dashboardimagethree}`}
                        alt="Dashboard"
                      />
                    </li>
                  )}
                  {dashboardimagefour && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${dashboardimagefour}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${dashboardimagefour}`}
                        alt="Dashboard"
                      />
                    </li>
                  )}
                  {rimsimage && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${rimsimage}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${rimsimage}`}
                        alt="Rims"
                      />
                    </li>
                  )}
                  {rimsimagetwo && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${rimsimagetwo}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${rimsimagetwo}`}
                        alt="Rims"
                      />
                    </li>
                  )}
                  {rimsimagethree && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${rimsimagethree}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${rimsimagethree}`}
                        alt="Rims"
                      />
                    </li>
                  )}
                  {rimsimagefour && (
                    <li
                      data-thumb={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${rimsimagefour}`}
                    >
                      <img
                        src={`https://topdevit.com/clients/carchaser/public/uploads/${Vehicle_Id}/${rimsimagefour}`}
                        alt="Rims"
                      />
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div id="vechiclevideo">
              <h2>Vehicle Video</h2>
              {/* Check if vechiclevideo is not empty */}
              {vechiclevideo ? (
                // If vechiclevideo is not empty, render the iframe

                <iframe
                  width="560"
                  height="315"
                  src={vechiclevideo}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                // If vechiclevideo is empty, render a message
                <p>No vehicle video</p>
              )}
            </div>
          </div>
          <div class="col-md-6">
            <div class="carlist-details">
              <div class="carlist-heading">
                <h4 class="location-heading p-0 m-0">location : </h4>
                <span class="inner-listname">{location}</span>
              </div>

              <div class="carlist-heading">
                <h4 class="vinenumber-heading p-0 m-0">vin number : </h4>
                <span class="inner-vinenumber">{vin}</span>
              </div>
              <div class="carlist-heading">
                <h4 class="year-heading p-0 m-0">Year :</h4>
                <span class="inner-year">{year}</span>
              </div>
              <div class="carlist-heading">
                <h4 class="model-heading p-0 m-0">Make :</h4>
                <span class="inner-model">{make}</span>
              </div>
              <div class="carlist-heading">
                <h4 class="model-heading p-0 m-0">model :</h4>
                <span class="inner-model">{model}</span>
              </div>
              <div class="carlist-heading">
                <h4 class="trim-heading p-0 m-0">trim : </h4>
                <span class="inner-trim">{trim}</span>
              </div>
              <div class="carlist-heading">
                <h4 class="Mileage:-heading p-0 m-0">Mileage : </h4>
                <span class="inner-Mileage:">{mileage}</span>
              </div>
              <div class="carlist-heading">
                <h4 class="Color-heading p-0 m-0">Color : </h4>
                <span class="inner-Color">{color}</span>
              </div>
              <div class="carlist-heading">
                <h4 class="Keys:-heading p-0 m-0">Keys : </h4>
                <span class="inner-Keys">{keys}</span>
              </div>
              <span>{featuresString}</span>
            </div>
            <div class="external-damage-panel pt-3">
              <h4 class="p-0 m-0">external damage to the vehicle.</h4>
              <span>{featuresStringtwo}</span>
              <h4 class="p-0 m-0">Any interior damage?</h4>
              <span>{featuresStringthree}</span>
              <div class="vehicle-detail">
                <h4 class="p-0 m-0">Our top priority is to sell your car.</h4>
                <div class="row">
                  <div class="col-md-9">
                    <span>Do you smoke in this vehicle?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{smokeInVehicle}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Do you have original factory rims?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{hasOriginalRims}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Have you replaced your tires in last 12 months?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{tireReplacement}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Is your car driveable?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{vehicleDrivable}</h5>
                  </div>
                  <div class="col-12">
                    <h6>{vehicledrivabledesc}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Any crack on the windshield?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{crackOnWindshield}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Do you have any extended warranty?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{extendedWarranty}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Are you interested in a trade In?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{tradeInInterest}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>How soon are you ready to sell?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{sellTiming}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Why are you selling?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{DonotNeedCar}</h5>
                    <h5>{MechElectIssues}</h5>
                    <h5>{DownSize}</h5>
                    <h5>{BuyAnotherCar}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>describe the condition of the car</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{carCondition}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Any Accident Claims? How Much?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{accidentclaims}</h5>
                  </div>
                  <div class="col-12">
                    <h6>{howmuchclaims}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>What Rims Are On The Car?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{carrims}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Do You Have Stock Rims?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{stockrim}</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Any Issues With The Vehicle?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{issuevichle} </h5>
                  </div>
                  <div class="col-12">
                    <h6>{issuevichledecs}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Are There Any Modifications On The Car?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{carmodify}</h5>
                  </div>
                  <div class="col-12">
                    <h6>{carmodifydecs}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <span>Is The Car Leased Or Financed?</span>
                  </div>
                  <div class="col-md-3">
                    <h5>{financed}</h5>
                  </div>
                  <div class="col-12">
                    <h6>{financeddesc}</h6>
                  </div>
                </div>
              </div>
              <div class="bottom-btn-details agent-btn-details my-4">
                <div class="edit-btn-details my-3 text-right">
                  <a
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg3"
                    class="btn btn-primary px-3 py-2"
                  >
                    {" "}
                    post inspection report
                  </a>
                </div>
                <div class="edit-btn-details my-3 text-right">
                  <a
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg4"
                    class="btn btn-primary px-3 py-2 "
                  >
                    {" "}
                    not able to inspection
                  </a>
                </div>
                <div
                  class="modal fade bd-example-modal-lg2 newcar-modal agent-modal-popup"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="myLargeModalLabel"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="agent-details-popup">
                          <h3 class="main-heading pt-4">
                            {" "}
                            Upload Own Car Images
                          </h3>
                          <form onSubmit={handleSubmitimage}>
                            <div className="row">
                              {imagePreviews.map((preview, index) => (
                                <div className="col-md-6" key={index}>
                                  <h3 className="vehicle-info-heading pt-3">
                                    {/* Add labels for each file input */}
                                    {index === 0 && "Interior of the car"}
                                    {index === 1 && "Exterior of the car"}
                                    {index === 2 && "Dashboard of the car"}
                                    {index === 3 && "Rims of the car"}
                                  </h3>
                                  <div className="form-add-image my-4">
                                    <div className="form-group">
                                      <input
                                        className="form-file"
                                        type="file"
                                        name="file"
                                        ref={(ref) =>
                                          (inputRefs.current[index] = ref)
                                        }
                                        onChange={(e) =>
                                          handleFileChange(index, e)
                                        }
                                        accept="image/*"
                                        placeholder="add-image"
                                      />
                                      <label
                                        className="form-label"
                                        htmlFor={`image-input${index + 1}`}
                                      >
                                        Add Image
                                      </label>
                                      <div
                                        id={`image-preview${index + 1}`}
                                        className="image-preview"
                                      >
                                        {preview && (
                                          <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div class="text-center">
                              {errorMessage && (
                                <p className="text-danger">{errorMessage}</p>
                              )}
                              {uploadSuccess && (
                                <p className="text-success">
                                  Images uploaded successfully!
                                </p>
                              )}
                              <button
                                type="submit"
                                class="btn btn-primary py-3 px-5"
                              >
                                Update Images
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="modal fade bd-example-modal-lg3 newcar-modal agent-modal-popup"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="myLargeModalLabel"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div class="modal-body px-5">
                        <h3 class="main-heading pt-4">
                          {" "}
                          Post Inspection Report
                        </h3>
                        <form>
                          <div class="form-group pb-4">
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="5"
                              placeholder="Enter Your Inspection Report Here"
                              value={inspectionReport}
                              onChange={handleChange}
                            ></textarea>
                          </div>

                          {postinspect && (
                            <p className="text-success">
                              {" "}
                              Post Inspection Report Submit successfully
                            </p>
                          )}
                          <div class="text-center">
                            <button
                              type="submit"
                              class="btn btn-primary py-2 pr-2 px-5 mr-3 mb-3"
                              onClick={(event) =>
                                handleSubmit(event, "approved")
                              }
                            >
                              Approve
                            </button>
                            <button
                              type="submit"
                              class="btn btn-primary py-2 px-5 mb-3"
                              onClick={(event) =>
                                handleSubmit(event, "disapproved")
                              }
                            >
                              Disapprove
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="modal fade bd-example-modal-lg4 newcar-modal agent-modal-popup"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="myLargeModalLabel"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div class="modal-body px-5">
                        <h3 class="main-heading pt-4">
                          {" "}
                          I'm not able to do the Inspection.{" "}
                        </h3>
                        <form onSubmit={handleSubmitNotAbleToInspect}>
                          <div class="form-group pb-4">
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="5"
                              placeholder="Reason, Why not able to Inspection? Note For Admin"
                              value={reason}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                          <div class="text-center">
                            {notableinspect && (
                              <p className="text-success">
                                Your Report Submit successfully
                              </p>
                            )}
                            <button
                              type="submit"
                              class="btn btn-primary py-2 px-5"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
