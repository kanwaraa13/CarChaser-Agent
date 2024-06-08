import React, { useEffect, useState, useRef } from 'react';
import { AgentNav } from './AgentNav';
import { useParams } from 'react-router-dom'; // import useParams
import api from '../api';
import html2pdf from 'html2pdf.js'; // Import html2pdf
export const SellerBos = () => {
   const pdfContentRef = useRef(null); // Define the ref for the content div
    const { sellerid } = useParams();
    const { Vehicle_Id } = useParams();
    const [sellername, setSellerName] = useState('');
    const [sellerlastname, setSellerLastName] = useState('');
    const [selleremail, setSellerEmail] = useState('');
    const [sellerphone, setSellerPhone] = useState('');
    const [sellercity, setSellerCity] = useState('');
    const [sellercode, setSellerCode] = useState('');
    const [fetchprice, setFetchPrice] = useState({}); // Initialize fetchprice with an empty object
    const [vehicleData, setVehicleData] = useState(null);
    const [vechicleid, setVehicleId] = useState('');
    const [vechiclevideo, setVechicleVideo] = useState('');
    const [location, setLocation] = useState('');
    const [vin, setVin] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [trim, setTrim] = useState('');
    const [mileage, setMileage] = useState('');
    const [color, setColor] = useState('');
    const [keys, setkeys] = useState('');
    const [settire, setSetTire] = useState('');
    const [windowtint, setWindowTint] = useState('');
    const [aftermarketexhaust, setAftermarketExhaust] = useState('');
    const [aftermarkrims, setAftermarkRims] = useState('');
    const [roofrack, setRoofRack] = useState('');
    const [remotestarter, setRemoteStarter] = useState('');
    const [aftermarkstereo, setAftermarkStereo] = useState('');
    const [aftermarketspoiler, setAftermarketSpoiler] = useState('');
    const [minordamage, setMinorDamage] = useState('');
    const [interiorimage, setInteriorImage] = useState('');
    const [interiorimagetwo, setInteriorImageTwo] = useState('');
    const [interiorimagethree, setInteriorImageThree] = useState('');
    const [interiorimagefour, setInteriorImageFour] = useState('');
    const [exteriorimage, setExteriorImage] = useState('');
    const [exteriorimagetwo, setExteriorImageTwo] = useState('');
    const [exteriorimagethree, setExteriorImageThree] = useState('');
    const [exteriorimagefour, setExteriorImageFour] = useState('');
    const [dashboardimage, setDashboardImage] = useState('');
    const [dashboardimagetwo, setDashboardImageTwo] = useState('');
    const [dashboardimagethree, setDashboardImageThree] = useState('');
    const [dashboardimagefour, setDashboardImageFour] = useState('');
    const [rimsimage, setRimsImage] = useState('');
    const [rimsimagetwo, setRimsImageTwo] = useState('');
    const [rimsimagethree, setRimsImageThree] = useState('');
    const [rimsimagefour, setRimsImageFour] = useState('');
    const [fadingpaints, setFadingPaints] = useState('');
    const [rust, setRust] = useState('');
    const [haildamage, setHailDamage] = useState('');
    const [extmintcondition, setExtMintCondition] = useState('');
    const [dents, setDents] = useState('');
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
    const [bidcount, setBidCount] = useState('');
    const [sellTiming, setSellTiming] = useState(''); 
    const [DonotNeedCar, setDonotNeedCar] = useState('');
    const [MechElectIssues, setMechElectIssues] = useState('');
    const [DownSize, setDownSize] = useState(''); 
    const [BuyAnotherCar, setBuyAnotherCar] = useState('')
    const [carCondition, setCarCondition] = useState('');
    const [accidentclaims, setAccidentClaims] = useState('');
    const [howmuchclaims, setHowMuchClaims] = useState('');
    const [carrims, setCarRims] = useState('');
    const [stockrim, setStockRim] = useState('');
    const [issuevichle, setIssueVichle] = useState('');
    const [issuevichledecs, setIssueVichleDecs] = useState('');
    const [carmodify, setCarMdify] = useState('');
    const [carmodifydecs, setCarMdifyDecs] = useState('');
    const [financed, setFinanced] = useState('');
    const [financeddesc, setFinancedDesc] = useState('');
    const [vehicledrivabledesc, setVehicleDrivableDes] = useState('');
    
    useEffect(() => {
       fetchData();
    }, []);
    useEffect(() => {
        fetchSellerData();
        }, []);
    const fetchSellerData = async () => {
        try {
          if (!sellerid) {
            console.error('Seller ID is not set');
            return;
          }
          const response = await api.get(`/seller/sellerlist/${sellerid}`);
          const sellerdata = response.data.Seller;
          console.log(sellerdata)
          setSellerName(sellerdata.Seller_FName);
          setSellerLastName(sellerdata.Seller_LName);
          setSellerEmail(sellerdata.Seller_Email);
          setSellerPhone(sellerdata.Seller_Phone);
          setSellerCity(sellerdata.Seller_City);
          setSellerCode(sellerdata.Seller_PostalCode);
        } catch (error) {
          console.error('Error fetching seller data:', error);
        }
      };

      const fetchData = async () => {
        try {
           const response = await api.get(`/seller/vehicle/${Vehicle_Id}`);
            const vehicleData = response.data;
            // Log the entire API response
            console.log('API response:', vehicleData);
       
            setLocation(vehicleData.vehicle.Location || '');
            setVin(vehicleData.vehicle.VIN || '');
            setYear(vehicleData.vehicle.Year || '');
            setMake(vehicleData.vehicle.Make || '');
            setModel(vehicleData.vehicle.Model || '');
            setTrim(vehicleData.vehicle.Trim || '');
            setMileage(vehicleData.vehicle.Mileage || '');
            setColor(vehicleData.vehicle.Color || '');
            setkeys(vehicleData.vehicle.Car_Keys || '');
            setSetTire(vehicleData.vehicle['2_Sets_Of_Tire'] || ''); 
            setWindowTint(vehicleData.vehicle['Win_Tint'] || ''); 
            setAftermarketExhaust(vehicleData.vehicle['Aftermark_Exhaust'] || ''); 
            setAftermarkRims(vehicleData.vehicle['Aftermark_Rims'] || ''); 
            setRoofRack(vehicleData.vehicle['Roof_Rack'] || ''); 
            setRemoteStarter(vehicleData.vehicle['Remote_Start'] || '');
            setRemoteStarter(vehicleData.vehicle['Remote_Start'] || '');
            setAftermarkStereo(vehicleData.vehicle['Aftermark_Stereo'] || '');
            setAftermarketSpoiler(vehicleData.vehicle['Aftermark_Spoiler'] || '');
            setMinorDamage(vehicleData.vehicle['Minor_Damage'] || '');
            setInteriorImage(vehicleData.vehicle['Interior_Image'] || '');
            setInteriorImageTwo(vehicleData.vehicle['Interior_Image2'] || '');
            setInteriorImageThree(vehicleData.vehicle['Interior_Image3'] || '');
            setInteriorImageFour(vehicleData.vehicle['Interior_Image4'] || '');
            setExteriorImage(vehicleData.vehicle['Exterior_Image'] || '');
            setExteriorImageTwo(vehicleData.vehicle['Exterior_Image2'] || '');
            setExteriorImageThree(vehicleData.vehicle['Exterior_Image3'] || '');
            setExteriorImageFour(vehicleData.vehicle['Exterior_Image4'] || '');
            setDashboardImage(vehicleData.vehicle['Dashboard_Image'] || '');
            setDashboardImageTwo(vehicleData.vehicle['Dashboard_Image2'] || '');
            setDashboardImageThree(vehicleData.vehicle['Dashboard_Image3'] || '');
            setDashboardImageFour(vehicleData.vehicle['Dashboard_Image4'] || '');
            setRimsImage(vehicleData.vehicle['Rims_Image'] || '');
            setRimsImageTwo(vehicleData.vehicle['Rims_Image2'] || '');
            setRimsImageThree(vehicleData.vehicle['Rims_Image3'] || '');
            setRimsImageFour(vehicleData.vehicle['Rims_Image4'] || '');
            setFadingPaints(vehicleData.vehicle['Fading_Paints'] || '');
            setRust(vehicleData.vehicle['Rust'] || '')
            setHailDamage(vehicleData.vehicle['Hail_Damage'] || '')
            setExtMintCondition(vehicleData.vehicle['Ext_Mint_Condition'] || '')
            setDents(vehicleData.vehicle['Dents'] || '')
            setRipsOrTears(vehicleData.vehicle['Seats_Rips_Tears'] || '')
            setVisibleStain(vehicleData.vehicle['Seats_Visible_Stain'] || '')
            setStrongSmell(vehicleData.vehicle['Strong_Smell'] || '')
            setDamagedSystems(vehicleData.vehicle['Nav_Entmt_Ctrl_Dmg_Sys'] || '')
            setIntMintCondition(vehicleData.vehicle['Int_Mint_Condition'] || '')
            setSmokeInVehicle(vehicleData.vehicle['Smoke_In_Vehicle'] || 'No')
            setHasOriginalRims(vehicleData.vehicle['Original_Factory_Rims'] || 'No')
            setTireReplacement(vehicleData.vehicle['Tires_Repld_12_Months'] || 'No')
            setVehicleDrivable(vehicleData.vehicle['Vehicle_Drivable'] || 'No')
            setCrackOnWindshield(vehicleData.vehicle['Windshield_Crack'] || 'No')
            setExtendedWarranty(vehicleData.vehicle['Extended_Warranty'] || 'No')
            setTradeInInterest(vehicleData.vehicle['TradeIn_Interested'] || 'No')
            setVehicleDrivableDes(vehicleData.vehicle['vehicle_drivable_not_explanation'])
  
           
           
            setSellTiming(vehicleData.vehicle['How_Soon_Ready_Sell'])
            setDonotNeedCar(vehicleData.vehicle['Donot_Need_Car'] || "")
            setMechElectIssues(vehicleData.vehicle['Mech_Elect_Issues'] || "")
            setDownSize(vehicleData.vehicle['Downsize'] || "")
            setBuyAnotherCar(vehicleData.vehicle['Buy_Another_Car'] || "")
            setCarCondition(vehicleData.vehicle['Car_Condition'])
            setAccidentClaims(vehicleData.vehicle['Accident_Claims'] || "No")
            setHowMuchClaims(vehicleData.vehicle['How_Much_Claims'] || "")
            setCarRims(vehicleData.vehicle['Car_Rims'])
            setStockRim(vehicleData.vehicle['Stock_Rims'] || "No")
            setIssueVichle(vehicleData.vehicle['Any_Vehicle_Issues'] || "No")
            setIssueVichleDecs(vehicleData.vehicle['Vehicle_Issues_desc'] || "")
            setCarMdify(vehicleData.vehicle['Car_Modification'] || "No")
            setCarMdifyDecs(vehicleData.vehicle['Modification_desc'] || "")
            setFinanced(vehicleData.vehicle['Leased_Financed'] || "No")
            setFinancedDesc(vehicleData.vehicle['Financed_By'] || "") 
            setVehicleId(vehicleData.vehicle['Vehicle_Id'] ) 
            setVechicleVideo(vehicleData.vehicle['Vehicle_video'] ) 
            
           
           if (vehicleData.vehicle['Leased_Financed'] === 1) {
              setFinanced('Yes');
           } 
           if (vehicleData.vehicle['Car_Modification'] === 1) {
              setCarMdify('Yes');
           } 
            if (vehicleData.vehicle['Any_Vehicle_Issues'] === 1) {
              setIssueVichle('Yes');
           } 
  
           if (vehicleData.vehicle['Stock_Rims'] === 1) {
              setStockRim('Yes');
           } 
           if (vehicleData.vehicle['Accident_Claims'] === 1) {
              setAccidentClaims('Yes');
           }
           if (vehicleData.vehicle['Donot_Need_Car'] === 1) {
              setDonotNeedCar('Don’t Need The Car Anymore');
           }
           if (vehicleData.vehicle['Mech_Elect_Issues'] === 1) {
              setMechElectIssues('Selling Because The Car Has Some Mechanical/ Electrical Issues');
           }
           if (vehicleData.vehicle['Downsize'] === 1) {
              setDownSize('Selling To Downsize');
           }
           if (vehicleData.vehicle['Buy_Another_Car'] === 1) {
              setBuyAnotherCar('Selling To Buy Another Car');
           }
         
           if (vehicleData.vehicle['TradeIn_Interested'] === 1) {
              setTradeInInterest('Yes');
           }
           if (vehicleData.vehicle['Extended_Warranty'] === 1) {
              setExtendedWarranty('Yes');
           }
           if (vehicleData.vehicle['Windshield_Crack'] === 1) {
              setCrackOnWindshield('Yes');
           }
           if (vehicleData.vehicle['Vehicle_Drivable'] === 1) {
              setVehicleDrivable('Yes');
           }
           if (vehicleData.vehicle['Tires_Repld_12_Months'] === 1) {
              setTireReplacement('Yes');
           }
           if (vehicleData.vehicle['Original_Factory_Rims'] === 1) {
              setHasOriginalRims('Yes');
           }
           if (vehicleData.vehicle['Original_Factory_Rims'] === 1) {
              setHasOriginalRims('Yes');
           }
           if (vehicleData.vehicle['Smoke_In_Vehicle'] === 1) {
              setSmokeInVehicle('Yes');
           }
           if (vehicleData.vehicle['2_Sets_Of_Tire'] === 1) {
              setSetTire('2 Sets of Tire');
           }
           if (vehicleData.vehicle['Win_Tint'] === 1) {
              setWindowTint('Window Tint');
           }
           if (vehicleData.vehicle['Aftermark_Exhaust'] === 1) {
              setAftermarketExhaust('Aftermarket Exhaust');
           } 
           if (vehicleData.vehicle['Aftermark_Rims'] === 1) {
              setAftermarkRims('Aftermarket Rims');
           }
           if (vehicleData.vehicle['Roof_Rack'] === 1) {
              setRoofRack('Roof Rack');
           }
           if (vehicleData.vehicle['Remote_Start'] === 1) {
              setRemoteStarter('Remote Start');
           }
           if (vehicleData.vehicle['Aftermark_Stereo'] === 1) {
              setAftermarkStereo('Aftermarket Stereo');
           }
           if (vehicleData.vehicle['Aftermark_Spoiler'] === 1) {
              setAftermarketSpoiler('Aftermarket Spoiler');
           }
           if (vehicleData.vehicle['Minor_Damage'] === 1) {
              setMinorDamage('Minor Damage');
           }
           if (vehicleData.vehicle['Fading_Paints'] === 1) {
              setFadingPaints('Fading Paints');
           }
           if (vehicleData.vehicle['Rust'] === 1) {
              setRust('Rust');
           }
           if (vehicleData.vehicle['Hail_Damage'] === 1) {
              setHailDamage('Hail Damage');
           }
           if (vehicleData.vehicle['Ext_Mint_Condition'] === 1) {
              setExtMintCondition('Mint Condition');
           }
           if (vehicleData.vehicle['Dents'] === 1) {
              setDents('Dents');
           }
           if (vehicleData.vehicle['Int_Mint_Condition'] === 1) {
              setIntMintCondition('Mint Condition');
           }
           if (vehicleData.vehicle['Nav_Entmt_Ctrl_Dmg_Sys'] === 1) {
              setDamagedSystems('Damaged Systems');
           }
           if (vehicleData.vehicle['Strong_Smell'] === 1) {
              setStrongSmell('Strong Smell');
           }
           if (vehicleData.vehicle['Seats_Visible_Stain'] === 1) {
              setVisibleStain('Visible Stain On The Seats');
           }
           if (vehicleData.vehicle['Seats_Rips_Tears'] === 1) {
              setRipsOrTears('Rips Or Tears On The Seats');
           }
        
        } catch (error) {
            console.error('Error fetching vehicle details:', error);
        }
     };

     const downloadPdf = async () => {
      try {
         const response = await api.post(`/seller/updatesellerbos/${Vehicle_Id}`);
         console.log(response.data)
       } catch (error) {
         console.error('Error fetching seller data:', error);
       }
  
       const content = pdfContentRef.current;

       if (content) {
         const opt = {
            margin: [10, 0, 10, 0], // [top, right, bottom, left]
           filename: 'seller_info.pdf',
           image: { type: 'jpeg', quality: 0.98 },
           html2canvas: { scale: 2 },
           jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
         };
   
         html2pdf().from(content).set(opt).save();
       } else {
         console.error('Error: pdf-content element not found');
       }
    };

      
return(
<section className="car-details">
      <AgentNav />
      <div id="pdf-content" ref={pdfContentRef}>
        <div class="dealer-bill py-4">
         <form method="post" action="#">
            <div class="container-fluid">
               <div class="dealer-head px-3">
                  <img src="data:image/png;base64,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" alt="logo-img"></img>
               </div>
               <div class="seller-purchaser px-3 py-4">
                  <h3 class="main-headding mb-4"> Seller BOS</h3>
                  <div class="row print-row">
                     <div class="col-lg-6 seller-bill">
                        <div class="d-flex">
                           <h4 class="py-4">SELLER</h4>
                        </div>
                        <div class="newbill-form">
                           <div class="new-group">
                              <p class="m-0">Name :-</p>
                              <div class="form-group newbill-border">                        
                                 <input type="text" name="name1" class="form-control" id="#" value={`${sellername}${sellerlastname} `}/>
                              </div>
                           </div>
                           <div class="new-group">
                              <p class="m-0">Address :-</p>
                              <div class="form-group newbill-border">                        
                              <input type="text" name="name1" class="form-control" id="#" value={`${sellercity} ${sellercode}`} />
                              </div>
                           </div>
                           <div class="new-group">
                              <p class="m-0">City/Prov/PC :-</p>
                              <div class="form-group newbill-border">                        
                                 <input type="text" name="name1" class="form-control" id="#"  value={sellercity} />
                              </div>
                           </div>
                           <div class="new-group">
                              <p class="m-0">Phone :-</p>
                              <div class="form-group newbill-border">                        
                                 <input type="text" name="name1" class="form-control" id="#" value={sellerphone}/>
                              </div>
                           </div>
                           <div class="new-group">
                              <p class="m-0">Email :-</p>
                              <div class="form-group newbill-border">                        
                                 <input type="text" name="name1" class="form-control" id="#" value={selleremail}/>
                              </div>
                           </div>
                           <div class="new-group">
                              <p class="m-0">Signature :-</p>
                              <div class="form-group newbill-border">                        
                                 <input type="text" name="name1" class="form-control" id="#" value={sellername}/>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="col-lg-6 seller-bill">
                        <div class="d-flex">
                           <h4 class="py-4 purchase-heading">PURCHASER</h4>
                           <div class="new-group">
                              <p class="m-0">Dealer #</p>                              
                           </div>
                        </div>
                        <div class="newbill-form">
                            <div class="new-group py-2">
                               <p class="m-0">Name :-</p>
                               <span> Car Chaser</span>
                            </div>
                            <div class="new-group py-2">
                               <p class="m-0">Address :-</p>
                               <span> 801- 1275 Finch Ave W</span>
                            </div>
                            <div class="new-group py-2">
                               <p class="m-0">City/Prov/PC :-</p>
                               <span>  North York ON M3L 0L5</span>
                            </div>
                            <div class="new-group py-2">
                               <p class="m-0">Phone :-</p>
                               <span> 647-689-6208</span>
                            </div>
                            <div class="new-group py-2">
                               <p class="m-0">Email :-</p>
                               <span>info@carchaser.com</span>
                            </div>
                            <div class="new-group py-2">
                               <p class="m-0">Signature :-</p>
                               <span> CarChaser</span>
                            </div>
                         </div>
                     </div>
                  </div>
               </div>
               <div class="bill-price mx-3 mt-4">
                  
                        <table class="table table-bordered mb-0">
                            <tbody>
                           <tr>
                              <th scope="col">STOCK #</th>
                              <th scope="col">YEAR</th>
                              <th scope="col">MAKE</th>
                              <th scope="col">MODEL</th>
                              <th scope="col">COLOUR</th>
                              <th scope="col">TRIM LEVEL</th>
                              <th scope="col">Transmission</th>
                           </tr>
                           <tr>
                              <td> <span>{Vehicle_Id}</span> </td>
                              <td> <span>{year}</span> </td>
                              <td> <span>{make}</span> </td>
                              <td> <span>{model}</span> </td>
                              <td> <span>{color}</span> </td>
                              <td> <span>{trim}</span> </td>
                              <td> <span>Automatic</span> </td>
                           </tr>
                        </tbody>
                        </table>
                        <table class="table table-bordered biil-price-checkbox mb-0">
                            <tbody>
                           <tr>
                              <td class="biil-price-serail">
                                 <div class="serail-no">
                                    <p class="m-0"> V.I.N. #</p>
                                    <p class="m-0">{vin}</p>
                                 </div>
                              </td>
                              <td class="biil-price-serail">
                                 <div class="serail-no">
                                    <p class="text-center m-0">GAS/DIESEL /ELECTRIC/HYBRID</p>
                                    <p class="text-center m-0"> DIESEL </p>
                                 </div>
                              </td>
                              <td>
                                 <div class="distane-travel">
                                    <div>
                                    <p class="m-0">MILEAGE</p>
                                    <p class="m-0"> {mileage} </p>
                                    </div>
                                    <div class="distance-checkbox">
                                       <div class="form-check">
                                          <label class="form-check-label" for="flexCheckDefault">
                                          KMS
                                          </label>
                                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                       </div>
                                       <div class="form-check">
                                          <label class="form-check-label" for="flexCheckDefault">
                                          MILES
                                          </label>
                                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td class="biil-price-new">
                                 <p class="text-center">Price</p>
                                 
                                 </td>
                                </tr>
                                </tbody>
                     
                    
                     </table>
                 
            </div>
            <div class="dealer-information px-3 pb-5">
               <div class="gst-main">
                  <div class="gst-section">
                     <p class="gst-para">LOAN ON BASE AMOUNT</p>
                    <div class="form-group newbill-border"> 
                        <label>$</label>                       
                        <input type="text" name="name1" class="form-control" id="#"/>
                     </div>
                  </div>
                  <div class="gst-section">
                     <p class="gst-para">GST/HST</p>
                     <div class="form-group newbill-border"> 
                        <label>$</label>                       
                        <input type="text" name="name1" class="form-control" id="#"/>
                     </div>
                  </div>
                  <div class="gst-section">
                     <p class="gst-para">LICENSING</p>
                     <div class="form-group newbill-border"> 
                        <label>$</label>                       
                        <input type="text" name="name1" class="form-control" id="#"/>
                     </div>
                  </div>
                  <div class="gst-section">
                     <p class="gst-para">QUALITY</p>
                     <div class="form-group newbill-border"> 
                        <label>$</label>                       
                        <input type="text" name="name1" class="form-control" id="#"/>
                     </div>
                  </div>
                  <div class="gst-section">
                     <p class="gst-para">TOTAL</p>
                     <div class="form-group newbill-border"> 
                        <label>$</label>                       
                        <input type="text" name="name1" class="form-control" id="#"/>
                     </div>
                  </div>
               </div>
            </div>
            <div class="text-center py-3">
               <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                  <label class="form-check-label" for="flexCheckDefault">
                  CARFAXTM
                  </label>
               </div>
            </div>
            <div class="mt-regi px-3">
               <h5>MTO REGISTRATION BRAND:</h5>
               <div class="mt-regi-form">
                  <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault">
                     IRREPARABLE
                     </label>
                  </div>
                  <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault">
                     REBUILT
                     </label>
                  </div>
                  <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault">
                     SALVAGE
                     </label>
                  </div>
                  <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault">
                     NONE
                     </label>
                  </div>
               </div>
            </div>
            <div class="discloser-info print-info py-4 px-3">
               <div class="row">
                  <div class="col-lg-6">
                     <div class="mvda-distance py-3">
                        <div class="mvda-checkbox">
                           <p class="mb-0">ODOMETER FAULTY, BROKEN, REPLACED OR ROLLED BACK</p>
                           <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                    
                           </div>
                        </div>
                        <div class="mvda-checkbox">
                           <p class="mb-0">SEE SECTION 1 ON PAGE 2 AND CHECK APPROPRIATE BOX HERE</p>
                           <div class="form-check">
                              <span class="pr-4 pb-1">1A</span>
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                
                           </div>
                           <div class="form-check">
                              <span class="pr-4 pb-1">1B</span>
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                           </div>
                        </div>
                        <div class="mvda-bottom-para">
                           <div class="mvda-bottom-left">
                              <p class="m-0">IF 1A IS CHECKED SHOW PREVIOUS ODOMETER READING</p>
                              <div class="mvda-last-para">
                                 <p>AND DATE OF PREVIOUS READING</p>
                                 
                              </div>
                           </div>
                           <div class="mvda-bottom-right">
                              <div class="mvda-kms">
                                 <div class="form-check">                               
                                    <input class="form-check-input ml-2" type="checkbox" value="" id="flexCheckDefault"/>                 
                                 </div>
                                 <div class="form-check">                                
                                    <input class="form-check-input ml-2" type="checkbox" value="" id="flexCheckDefault"/>                  
                                 </div>
                              </div>
                              <div class="mvda-bottom-box">
                                 <div class="new-group">
                                    <div class="form-group newbill-border">                        
                                       <input type="text" name="name1" class="form-control" id="#"/>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="row py-3">
                        <div class="col-lg-6">
                           <div class="mvda-checkbox">
                              <p class="mb-0">DAILY RENTAL</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                   
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-6 pl-3">
                           <div class="mvda-checkbox">
                              <p class="mb-0">POLICE CRUISER</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-6">
                           <div class="mvda-checkbox">
                              <p class="mb-0">FIRE DAMAGED</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-6">
                           <div class="mvda-checkbox">
                              <p class="mb-0">EMR SERVICES VEHICLE</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>             
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-6">
                           <div class="mvda-checkbox">
                              <p class="mb-0">WATER DAMAGED</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-6">
                           <div class="mvda-checkbox">
                              <p class="mb-0">TAXI OR LIMO</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="row pb-4">
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">REPAIRS TO SUSPENSION/SUBFRAME REQUIRED</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>               
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">STRUCTURAL PARTS DAMAGED ALTERED OR REPAIRED</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">PREVIOUS REPAIRED DAMAGE EXCEEDED $3,000</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">MANUFACTURER’S BADGES OR DECALS HAVE BEEN CHANGED</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                 
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">ORIGINAL PRODUCTION SPECIFICATIONS HAVE BEEN CHANGED</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                 
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-6">
                     <div class="mvda-distance mvda-new-distance">
                        <p class="mb-0 text-center"><b>WITHIN THE LAST SEVEN YEARS VEHICLE WAS:</b></p>
                        <div class="mvda-checkbox">
                           <p class="mb-0">OUT-OF-PROVINCE VEHICLE</p>
                           <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                   
                           </div>
                        </div>
                        <div class="mvda-checkbox">
                           <p class="mb-0">U.S. VEHICLE</p>
                           <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                           </div>
                        </div>
                        <p class="m-0">IF YES IDENTIFY PROVINCE(S) AND/OR STATE(S):</p>
                        <div class="new-group-pro">
                           <div class="form-group newbill-border">                        
                              <input type="text" name="name1" class="form-control" id="#"/>
                           </div>
                        </div>
                        <div class="new-group-pro mb-3">
                           <div class="form-group newbill-border">                        
                              <input type="text" name="name1" class="form-control" id="#"/>
                           </div>
                        </div>
                     </div>
                     <div class="row pb-4 py-4">
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">ANTI-LOCK BRAKES INOPERABLE</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                 
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">AIR BAGS MISSING/INOPERABLE</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">POLLUTION CONTROL INOPERABLE</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                 
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">DECLARED TOTAL LOSS BY AN INSURER</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>               
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">DECLARED A THEFT RECOVERY</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">MANUFACTURER’S WARRANTY CANCELLED</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>                  
                              </div>
                           </div>
                        </div>
                        <div class="col-lg-12">
                           <div class="mvda-checkbox">
                              <p class="mb-0">ANY BODY PANELS PAINTED OR REPLACED</p>
                              <div class="form-check">
                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>               
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="mvda-bottom-end">
               <div class="newbill-form">
                  <div class="new-group">
                     <p class="m-0">ANY OTHER DISCLOSURES:</p>
                     <div class="new-group-pro w-100">
                        <div class="form-group newbill-border">                        
                           <input type="text" name="name1" class="form-control" id="#"/>
                        </div>
                     </div>
                  </div>
                  <div class="new-group">
                     <p class="m-0"> DISCLOSURES DETAILS:</p>
                     <div class="new-group-pro w-100">
                        <div class="form-group newbill-border">                        
                           <input type="text" name="name1" class="form-control" id="#"/>
                        </div>
                     </div>
                  </div>
                  <div class="new-group-pro w-100">
                     <div class="form-group newbill-border">                        
                        <input type="text" name="name1" class="form-control" id="#"/>
                     </div>
                  </div>
               </div>
            </div>
      </div>
      </form>
      </div>

      </div>
      <div className='container-fluid'>
    <div className='row'>
        <div className='com-md-12'>
            <button type="button" className="btn btn-primary ml-3 text-center my-3" onClick={downloadPdf}>
            Pdf Download
        </button>
        </div>
    </div>
</div>
    </section>
);
};