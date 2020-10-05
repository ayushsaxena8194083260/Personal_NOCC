// import Highcharts from 'highcharts';

// class HighChart extends Component
//     {
//         // let user, st, plants, hgm, um;
//         //   function __construct()
//         //   {
//         //     parent::__construct();
//         //     $this->user		=	unserialize($this->session->userdata('users'));
//         //     $this->load->model('manager/settingmanager');
//         //     $this->st  = $this->settingmanager;
//         //     $this->load->model('manager/highchartgraphmanager');
//         //     $this->hgm  = $this->highchartgraphmanager;
//         //     $this->load->model('manager/usermanager');
//         //     $this->um  = $this->usermanager;
//         //     $this->load->model('manager/penaltydatamanager');
//         //     $this->pdm  = $this->penaltydatamanager;
//         //     if (class_exists('Memcache'))
//         //     {
//         //       $memcache = new Memcache;
//         //       $memname = "user:plant:".$this->user->user_id;
//         //       $memcacheConfig = $this->config->item('cache_memcache');
//         //       $memcache->connect($memcacheConfig['host'], $memcacheConfig['port']);
//         //       $this->plants = unserialize($memcache->get($memname));
//         //       $memcache->close();
//         //     }
//         //   }

//         makegraphactual(data)
//         {
//             let graphId = data.graphId;
//             let canvasId = data.canvasId;
//             let graphData = data;
//             let date = data.toDate;
//             let from = data.fromDate;
//             // $graphData   = $graphData[0];
//             // $date= $this->hgm->getEnday($graphData);
//             // $from= $this->hgm->getStartday($graphData,$date);
//             let time = data.timePeriod;//graphData->time_period;
//             let unit = data.timeGroup;//graphData->time_group;
//             let y1_text = data.y1Title;//graphData->y1_title." (".$graphData->y1_unit.")";
//             let colorArr = data.colorCode.split(",");//explode(',',$graphData->color_code);
//             let labelArr = data.label.split(",");//explode(',',$graphData->label);
//             let deviceArr = data.device.split('!@#');//explode('!@#',$graphData->device);
//             let deviceTextArr = data.deviceText.split('!@#');//explode('!@#',$graphData->device_text);
//             let channelArr = data.chaneel.split(',');//explode(',',$graphData->channel);
//             let aggregateArr = data.aggregation.split(',');//explode(',',$graphData->aggregation);
//             // let colorArr= dataexplode(',',$graphData->color_code);
//             let report = '';
//             if (time == "fyear") {
//                 report = 'YTD';
//             }
//             else if (time == "quarterly") {
//                 report = 'QTD';
//             }
//             else if (time == "month") {
//                 report = 'MTD';
//             }
//             else {
//                 report = 'DTD';
//             }
//             let plantArr = [];
//             if (data.plant != NULL) {//graphData->plant
//                 plantArr = data.plant.split(',');//explode(',',$graphData->plant);
//             } else {
//                 plantArr = [];//array();
//             }
//             let queryArray = [];
//             let i = 0;
//             for (i = 0; i < labelArr.length; i++) {
//                 if (labelArr[i] == 'Forecast') {
//                     if (deviceArr[i] == "forecast_generation") {
//                         if (aggregateArr[$i] == '') {
//                             aggregate = 'SUM';
//                         } else {
//                             aggregate = aggregateArr[i];
//                         }
//                         let select = deviceArr[i];
//                         if (select == "forecast_generation") {
//                             select = 'forecast_generation';
//                         }
//                         let column = 'Forecast';
//                         if (plantArr == "") {
//                             // if(unit == 'year'){
//                             // if(time == 'fyear'||time == 'rolling_year' ||time == 'year'){
//                             //     $newDate = date('Y-m-t',strtotime($date." first day of last month"));
//                             //     $currMFday = date('Y-m-01',strtotime($date));
//                             //    $lastMFday = date('Y-m-01',strtotime($date."first day of last month"));
//                             //     $query = '';
//                             //     $query  = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select.") as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM forecast f INNER JOIN plant p ON p.plant_id = f.plant_id WHERE STR_TO_DATE( CONCAT( f.year,  '-', f.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$newDate."' AND p.plant_id !=22 AND p.plant_id !=52 ";
//                             //     $query .= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(forecast*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1),2),0)) as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t',  strtotime($date))."') AS forecast FROM forecast WHERE  MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )f ON pg2.plant_id = f.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                             //     $query  = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." FROM (".$query.") as t GROUP BY t.year".$i  ;
//                             // $queryArray[$i] = $query;
//                             // }
//                             // else if($time == 'month')
//                             // {
//                             // $query = '';
//                             // $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(forecast*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1),2),0)) as data".$i.",year('".$from."') as year".$i.",month('".$from."')  as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t',  strtotime($date))."') AS forecast FROM forecast WHERE MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )f ON pg2.plant_id = f.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                             // $queryArray[$i] = $query;
//                             // }
//                             // else if($time == 'quarterly')
//                             // {
//                             //   $curMonth = date("m", strtotime($date));
//                             //   $mnthCheck = array("01","04","07","10");
//                             //   if(in_array($curMonth,$mnthCheck))
//                             //   {
//                             //           $sqlJoin = FALSE;
//                             //   }
//                             //   else
//                             //   {
//                             //           $sqlJoin = TRUE;
//                             //   }
//                             //   if($sqlJoin)
//                             //   {
//                             //   $query = '';
//                             //   $query  = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select.") as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM forecast f INNER JOIN plant p ON p.plant_id = f.plant_id WHERE STR_TO_DATE( CONCAT( f.year,  '-', f.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$newDate."' AND p.plant_id !=22 AND p.plant_id !=52 ";
//                             //   $query .= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(forecast*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1),2),0)) as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t',  strtotime($date))."') AS forecast FROM forecast WHERE  MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )f ON pg2.plant_id = f.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                             //   $query  = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." FROM (".$query.") as t GROUP BY t.year".$i  ;
//                             //   }
//                             //   else{
//                             //   $query = '';
//                             //   $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(forecast*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1),2),0)) as data".$i.",year('".$from."') as year".$i.",month('".$from."')  as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t',  strtotime($date))."') AS forecast FROM forecast WHERE MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )f ON pg2.plant_id = f.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                             //   $query  = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." ,  t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i  ;

//                             //   }
//                             //   $queryArray[$i] = $query;
//                             // }
//                             // }
//                             //   }
//                         }
//                     }
//                         else if (deviceArr[i] == "net_generation") {
//                             if ($aggregateArr[i] == '') {
//                                 aggregate = 'SUM';
//                             } else {
//                                 aggregate = aggregateArr[i];
//                             }
//                             select = deviceArr[i];
//                             if (select == "net_generation") {
//                                 select = 'actual_generation - import';
//                             }
//                             column = 'Actual';
//                             if (plantArr == "") {
//                                 //   if($unit == 'year'){
//                                 // //     $newDate = date('Y-m-t',strtotime($date." first day of last month"));
//                                 // //     $currMFday = date('Y-m-01',strtotime($date));
//                                 // //     $lastMFday = date('Y-m-01',strtotime($date."first day of last month"));
//                                 // //   $query = '';
//                                 // //   if($time == 'fyear'||$time == 'rolling_year'){
//                                 // //   $query  = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$from."') as year".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52 AND pg.date BETWEEN '".$from."' AND '".$newDate."' AND data_flag = 2 ";
//                                 // //   $query .= "UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i." FROM plant AS p
//                                 // //   LEFT OUTER  JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id
//                                 // //   LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date,'".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id !=22 AND p.plant_id !=52";
//                                 // //   $query  = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i." FROM (".$query.") as t "  ;
//                                 // //   }
//                                 // //   else if($time == 'month')
//                                 // //   {
//                                 // //   $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
//                                 // //   LEFT OUTER  JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id
//                                 // //   LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date,'".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id !=22 AND p.plant_id !=52 GROUP BY year(pg.date),month(pg.date)";
//                                 // //   $query  = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i."";
//                                 // //    }
//                                 // //   else if($time == 'quarterly')
//                                 // //   {
//                                 // //     $curMonth = date("m", strtotime($date));
//                                 // //     $mnthCheck = array("01","04","07","10");
//                                 // //     if(in_array($curMonth,$mnthCheck))
//                                 // //     {
//                                 // //             $sqlJoin = FALSE;
//                                 // //     }
//                                 // //     else
//                                 // //     {
//                                 // //             $sqlJoin = TRUE;
//                                 // //     }
//                                 // //   if($sqlJoin)
//                                 // //   {
//                                 // //   $query  = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE pg.date BETWEEN '".$from."' AND '".$newDate."' AND data_flag = 2 AND p.plant_id !=22 AND p.plant_id !=52 GROUP BY YEAR(pg.date)";
//                                 // //   $query .= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
//                                 // //   LEFT OUTER  JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id
//                                 // //   LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date,'".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id !=22 AND p.plant_id !=52  GROUP BY YEAR(pg.date)";
//                                 // //   $query  = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i."";
//                                 // //   }
//                                 // //   else
//                                 // //   {
//                                 // //   $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
//                                 // //   LEFT OUTER  JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id
//                                 // //   LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date,'".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id !=22 AND p.plant_id !=52  GROUP BY YEAR(pg.date)";
//                                 // //   $query  = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i."";
//                                 // //   }
//                                 // //   }
//                                 // }
//                                 // $queryArray[$i] = $query;
//                             }
//                         }
//                         else if (deviceArr[i] == "generation_budget") {
//                         if (aggregateArr[i] == '') {
//                             aggregate = 'SUM';
//                         } else {
//                             aggregate = aggregateArr[i];
//                         }
//                         select = deviceArr[$i];
//                         if (select == "generation_budget") {
//                             select = 'generation_jmr';
//                             type = 'Budget';
//                         }
//                         column = 'Budget';
//                         if (plantArr == '') {
//                                 //   if($unit == 'year'){
//                                 //   if($time == 'fyear'||$time == 'rolling_year' ||$time == 'year'){
//                                 //     $newDate = date('Y-m-t',strtotime($date." first day of last month"));
//                                 //     $currMFday = date('Y-m-01',strtotime($date));
//                                 //     $lastMFday = date('Y-m-01',strtotime($date."first day of last month"));
//                                 //   $query = '';
//                                 //   $query  = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select.") as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM lender_detail ld INNER JOIN plant p ON p.plant_id = ld.plant_id WHERE ld.type ='".$type."' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$newDate."' AND p.plant_id !=22 AND p.plant_id !=52 ";
//                                 //   $query .= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(budget*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1),2),0)) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t',  strtotime($date))."') AS budget FROM lender_detail WHERE TYPE = '".$type."' AND MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )ld ON pg2.plant_id = ld.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                                 //   $query  = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." FROM (".$query.") as t GROUP BY t.year".$i  ;

//                                 //   $queryArray[$i] = $query;
//                                 //   }
//                                 //   else if($time == 'month')
//                                 //   {
//                                 //   $query = '';
//                                 //   $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(budget*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1),2),0)) as data".$i.",year('".$from."') as year".$i.",month('".$from."')  as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t',  strtotime($date))."') AS budget FROM lender_detail WHERE TYPE = '".$type."' AND MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )ld ON pg2.plant_id = ld.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                                 //   $queryArray[$i] = $query;
//                                 //   }
//                                 //   else if($time == 'quarterly')
//                                 //   {
//                                 //     $curMonth = date("m", strtotime($date));
//                                 //     $mnthCheck = array("01","04","07","10");
//                                 //     if(in_array($curMonth,$mnthCheck))
//                                 //     {
//                                 //             $sqlJoin = FALSE;
//                                 //     }
//                                 //     else
//                                 //     {
//                                 //             $sqlJoin = TRUE;
//                                 //     }
//                                 //     if($sqlJoin)
//                                 //     {
//                                 //     $query = '';
//                                 //     $query  = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select.") as data".$i.",year('".$date."') as year".$i.",ld.month as month".$i." FROM lender_detail ld INNER JOIN plant p ON p.plant_id = ld.plant_id WHERE ld.type ='".$type."' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$newDate."'  AND p.plant_id !=22 AND p.plant_id !=52 GROUP BY ld.type";
//                                 //     $query .= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(budget*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1),2),0)) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t',  strtotime($date))."') AS budget FROM lender_detail WHERE TYPE = '".$type."' AND MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )ld ON pg2.plant_id = ld.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                                 //     $query  = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." ,  t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i  ;

//                                 //     }
//                                 //     else{
//                                 //     $query = '';
//                                 //     $query = " SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(budget*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1),2),0)) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t',  strtotime($date))."') AS budget FROM lender_detail WHERE TYPE = '".$type."' AND MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )ld ON pg2.plant_id = ld.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                                 //     $query  = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." ,  t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i  ;

//                                 //     }
//                                 //     $queryArray[$i] = $query;
//                                 //   }
//                                 //   }
//                             }
//                         }
//                     }
//         }
//         let xcatArray = [];
//         let dataArray = [];
//         let nameArray = [];
//         for (i = 0; i < queryArray.length; i++) {
//             responseArray = data;//$this->um->runGivenQuery($queryArray[$i]);
//             // $responseArray =$responseArray[0] ;
//             // array_push($dataArray,(float) $responseArray->{"data".$i});
//             // array_push($xcatArray,number_format(((float) $responseArray->{"data".$i}/1000000),2,'.',''));
//             // array_push($nameArray,$responseArray->{"individual_name".$i});
//         }
//         // $chart = new Highchart();
//         // $chart->chart->renderTo = "canvas".$canvasId;
//         // $chart->chart->type = "bar";
//         //$chart->chart->plotBackgroundImage = null;
//         let chart = [];
//         chart.title.text = ('Date from: ' + data.fromDate + ' to: ' + data.toDate);
//         chart.spacingLeft = 40;
//         chart.marginRight = 85;
//         chart.height = 245;
//         chart.xAxis.categories = xcatArray;
//         chart.xAxis.labels.enabled = false;
//         chart.xAxis.title.text = "";
//         chart.yAxis.title.text = y1_text;
//         chart.yAxis.title.style.color = '#003AFA';
//         chart.yAxis.labels.style.color = '#003AFA';
//         chart.yAxis.gridLineWidth = 0;
//         chart.yAxis.minorGridLineWidth = 0;
//         chart.plotOptions.series.colorByPoint = true;
//         chart.plotOptions.bar.dataLabels.enabled = true;
//         chart.plotOptions.bar.dataLabels.useHTML = true;
//         chart.plotOptions.bar.dataLabels.padding = 0;
//         chart.plotOptions.bar.dataLabels.color = 'black';
//         // chart.plotOptions.bar.dataLabels.formatter = new HighchartJsExpr(
//         // "function() {
//         // return '<b>' + this.series.name[this.series.data.indexOf( this.point )] +'</b> '+ this.x +' Mn units';}");

//         // $chart->tooltip->formatter = new HighchartJsExpr(
//         // "function() {
//         // return '<b>' + this.series.name[this.series.data.indexOf( this.point )] +'</b><br/> '+ this.x +' Mn units';}");
//         // $chart->legend->enabled = false;
//         // $chart->legend->labelFormatter = new HighchartJsExpr(
//         // "function() {
//         // return this.color}");
//         chart.colors = colorArr;
//         //     chart.series[] = array(
//         //       'name' => $nameArray,
//         //       'color' => array(
//         //           "<b>Net Generation<font></b>",
//         //           "<b>Budget Generation</b>",
//         //           "<b>Forecast Generation</b>"
//         //       ),
//         //     'data' => $dataArray
//         // );
//         chart.exporting.buttons.customButton.x = 5;
//         chart.exporting.buttons.customButton.y = -40;
//         chart.exporting.buttons.customButton.align = 'right';
//         chart.exporting.buttons.customButton.verticalAlign = 'bottom';
//         //   $chart.exporting.buttons.customButton.onclick=new HighchartJsExpr(
//         //   "function() {
//         //   window.open('/report/DeviateExcelExport/".$report."','_blank');}");
//         chart.exporting.buttons.customButton.text = 'Dev <br/>Report';

//         return chart;//->render("chart1");

//     }

//     makegraphrevenue(data) {
//         let graphId = data.graphId;
//         let canvasId = data.canvasId;
//         let graphData = data;
//         // $graphData = $graphData[0];
//         let date = data.toDate;//$this -> hgm -> getEnday($graphData);
//         let from = data.fromDate;//$this -> hgm -> getStartday($graphData, $date);
//         let time = data.timePeriod;
//         let unit = data.timeGroup;
//         let y1_text = data.y1Title+"("+data.y1Unit+")";
//         let colorArr = data.colorCode.split(",");//explode(',',$graphData->color_code);
//         let labelArr = data.label.split(",");//explode(',',$graphData->label);
//         let deviceArr = data.device.split('!@#');//explode('!@#',$graphData->device);
//         let deviceTextArr = data.deviceText.split('!@#');//explode('!@#',$graphData->device_text);
//         let channelArr = data.chaneel.split(',');//explode(',',$graphData->channel);
//         let aggregateArr = data.aggregation.split(',');//explode(',',$graphData->aggregation);
//         let plantArr = [];
//         if (data.plant != null) {
//             plantArr = data.plant.split(',');
//         } else {
//             plantArr = [];
//         }
//         let queryArray = [];
//         for (let i = 0; i < labelArr.length; i++) {
//             if (labelArr[i] == 'Forecast') {
//                 if (deviceArr[i] == "forecast_generation_revenue") {
//                     if (aggregateArr[i] == '') {
//                         aggregate = 'SUM';
//                     } else {
//                         aggregate = aggregateArr[i];
//                     }
//                     select = deviceArr[i];
//                     if (select == "forecast_generation_revenue") {
//                         select = 'forecast_generation';
//                     }
//                     column = 'Forecast';
//                     if (plantArr == "") {
//                 //         if (unit == 'year') {
//                 //             if ($time == 'fyear' || $time == 'rolling_year' || $time == 'year') {
//                 //                 $newDate = date('Y-m-t', strtotime($date." first day of last month"));
//                 //                 $currMFday = date('Y-m-01', strtotime($date));
//                 //                 $lastMFday = date('Y-m-01', strtotime($date."first day of last month"));
//                 //                 $query = '';
//                 //                 $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select."*p.tariff) as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM forecast f INNER JOIN plant p ON p.plant_id = f.plant_id WHERE STR_TO_DATE( CONCAT( f.year,  '-', f.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$newDate."' AND p.plant_id !=22 AND p.plant_id !=52 ";
//                 //                 $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(forecast*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1)*p.tariff,2),0)) as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t', strtotime($date))."') AS forecast FROM forecast WHERE  MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )f ON pg2.plant_id = f.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                 //                 $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." FROM (".$query.") as t GROUP BY t.year".$i;

//                 //                 $queryArray[$i] = $query;
//                 //             }
//                 //             else if ($time == 'month') {
//                 //                 $query = '';
//                 //                 $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(forecast*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1)*p.tariff,2),0)) as data".$i.",year('".$from."') as year".$i.",month('".$from."')  as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t', strtotime($date))."') AS forecast FROM forecast WHERE MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )f ON pg2.plant_id = f.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                 //                 $queryArray[$i] = $query;
//                 //             }
//                 //             else if ($time == 'quarterly') {
//                 //                 $curMonth = date("m", strtotime($date));
//                 //                 $mnthCheck = array("01", "04", "07", "10");
//                 //                 if (in_array($curMonth, $mnthCheck)) {
//                 //                     $sqlJoin = FALSE;
//                 //                 }
//                 //                 else {
//                 //                     $sqlJoin = TRUE;
//                 //                 }
//                 //                 if ($sqlJoin) {
//                 //                     $query = '';
//                 //                     $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select."*p.tariff) as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM forecast f INNER JOIN plant p ON p.plant_id = f.plant_id WHERE STR_TO_DATE( CONCAT( f.year,  '-', f.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$newDate."' AND p.plant_id !=22 AND p.plant_id !=52 ";
//                 //                     $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(forecast*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1),2)*p.tariff,0)) as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t', strtotime($date))."') AS forecast FROM forecast WHERE  MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )f ON pg2.plant_id = f.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                 //                     $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." FROM (".$query.") as t GROUP BY t.year".$i;
//                 //                 }
//                 //                 else {
//                 //                     $query = '';
//                 //                     $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(forecast*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1)*p.tariff,2),0)) as data".$i.",year('".$from."') as year".$i.",month('".$from."')  as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t', strtotime($date))."') AS forecast FROM forecast WHERE MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )f ON pg2.plant_id = f.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                 //                     $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." ,  t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i;

//                 //                 }
//                 //                 $queryArray[$i] = $query;
//                 //             }
//                 //         }
//                     }
//                 }
//                 else if (deviceArr[i] == "net_generation_revenue") {
//                     if (aggregateArr[i] == '') {
//                         aggregate = 'SUM';
//                     } else {
//                         aggregate = aggregateArr[i];
//                     }
//                     select = deviceArr[$i];
//                     if (select == "net_generation_revenue") {
//                         select = '(pg.actual_generation - pg.import)*p.tariff';
//                     }
//                     column = 'Actual';
//                     // if (empty($plantArr)) {
//                     //     if ($unit == 'year') {
//                     //         $newDate = date('Y-m-t', strtotime($date." first day of last month"));
//                     //         $currMFday = date('Y-m-01', strtotime($date));
//                     //         $lastMFday = date('Y-m-01', strtotime($date."first day of last month"));
//                     //         $query = '';
//                     //         if ($time == 'fyear' || $time == 'rolling_year') {
//                     //             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$from."') as year".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52 AND pg.date BETWEEN '".$from."' AND '".$newDate."' AND data_flag = 2 ";
//                     //             $query.= "UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i." FROM plant AS p
//                     //             LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
//                     //             LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52";
//                     //             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i." FROM (".$query.") as t ";
//                     //         }
//                     //         else if ($time == 'month') {
//                     //             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
//                     //             LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
//                     //             LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52 GROUP BY year(pg.date), month(pg.date)";
//                     //             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i."";
//                     //         }
//                     //         else if ($time == 'quarterly') {
//                     //             $curMonth = date("m", strtotime($date));
//                     //             $mnthCheck = array("01", "04", "07", "10");
//                     //             if (in_array($curMonth, $mnthCheck)) {
//                     //                 $sqlJoin = FALSE;
//                     //             }
//                     //             else {
//                     //                 $sqlJoin = TRUE;
//                     //             }
//                     //             if ($sqlJoin) {

//                     //                 $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE pg.date BETWEEN '".$from."' AND '".$newDate."' AND data_flag = 2 AND p.plant_id !=22 AND p.plant_id !=52 GROUP BY YEAR(pg.date)";
//                     //                 $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
//                     //                 LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
//                     //                 LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52  GROUP BY YEAR(pg.date)";
//                     //                 $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i."";
//                     //             }
//                     //             else {
//                     //                 $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
//                     //                 LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
//                     //                 LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52  GROUP BY YEAR(pg.date)";
//                     //                 $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i."";
//                     //             }
//                     //         }
//                     //     }
//                     //     $queryArray[$i] = $query;
//                     // }
//                 }
//                 else if (deviceArr[i] == "generation_budget_revenue") {
//                     if (aggregateArr[i] == '') {
//                         aggregate = 'SUM';
//                     } else {
//                         aggregate = aggregateArr[i];
//                     }
//                     select = deviceArr[i];
//                     if (select == "generation_budget_revenue") {
//                         select = 'generation_jmr';
//                         type = 'Budget';
//                     }
//                     column = 'Budget';
//                     // if (empty($plantArr)) {
//                     //     if ($unit == 'year') {
//                     //         if ($time == 'fyear' || $time == 'rolling_year' || $time == 'year') {
//                     //             $newDate = date('Y-m-t', strtotime($date." first day of last month"));
//                     //             $currMFday = date('Y-m-01', strtotime($date));
//                     //             $lastMFday = date('Y-m-01', strtotime($date."first day of last month"));
//                     //             $query = '';
//                     //             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select."*p.tariff) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM lender_detail ld INNER JOIN plant p ON p.plant_id = ld.plant_id WHERE ld.type ='".$type."' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$newDate."' AND p.plant_id !=22 AND p.plant_id !=52 ";
//                     //             $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(budget*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1)*p.tariff,2),0)) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t', strtotime($date))."') AS budget FROM lender_detail WHERE TYPE = '".$type."' AND MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )ld ON pg2.plant_id = ld.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                     //             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." FROM (".$query.") as t GROUP BY t.year".$i;
//                     //             $queryArray[$i] = $query;
//                     //         }
//                     //         else if ($time == 'month') {
//                     //             $query = '';
//                     //             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(budget*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1)*p.tariff,2),0)) as data".$i.",year('".$from."') as year".$i.",month('".$from."')  as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t', strtotime($date))."') AS budget FROM lender_detail WHERE TYPE = '".$type."' AND MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )ld ON pg2.plant_id = ld.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                     //             $queryArray[$i] = $query;
//                     //         }
//                     //         else if ($time == 'quarterly') {
//                     //             $curMonth = date("m", strtotime($date));
//                     //             $mnthCheck = array("01", "04", "07", "10");
//                     //             if (in_array($curMonth, $mnthCheck)) {
//                     //                 $sqlJoin = FALSE;
//                     //             }
//                     //             else {
//                     //                 $sqlJoin = TRUE;
//                     //             }
//                     //             if ($sqlJoin) {
//                     //                 $query = '';
//                     //                 $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select."*p.tariff) as data".$i.",year('".$date."') as year".$i.",ld.month as month".$i." FROM lender_detail ld INNER JOIN plant p ON p.plant_id = ld.plant_id WHERE ld.type ='".$type."' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$newDate."'  AND p.plant_id !=22 AND p.plant_id !=52 GROUP BY ld.type";
//                     //                 $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(budget*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1)*p.tariff,2),0)) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t', strtotime($date))."') AS budget FROM lender_detail WHERE TYPE = '".$type."' AND MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )ld ON pg2.plant_id = ld.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                     //                 $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." ,  t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i;

//                     //             }
//                     //             else {
//                     //                 $query = '';
//                     //                 $query = " SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(IFNULL(ROUND(budget*(DATEDIFF('".$date."',IFNULL(pg2.jmr_date,'".$currMFday."'))+1)*p.tariff,2),0)) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM plant AS p LEFT OUTER JOIN(select plant_id,jmr_date from plant_generation where month(date)=month('".$lastMFday."') and year(date)=year('".$lastMFday."') and data_flag=2)as pg2 on p.plant_id=pg2.plant_id LEFT OUTER JOIN ( SELECT plant_id, month,".$aggregateArr[$i]."(".$select."/'".date('t', strtotime($date))."') AS budget FROM lender_detail WHERE TYPE = '".$type."' AND MONTH = MONTH('".$currMFday."') AND YEAR = YEAR('".$currMFday."') GROUP BY plant_id )ld ON pg2.plant_id = ld.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52";
//                     //                 $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." ,  t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i;

//                     //             }
//                     //             $queryArray[$i] = $query;
//                     //         }
//                     //     }
//                     // }
//                 }
//             }
//         }
//         // $currencyqueryString = "SELECT * FROM currency where currency_type='USDINR'";
//         // $currency_result = $this -> um -> runGivenQuery($currencyqueryString);
//         // $doller = $currency_result[0] -> currency_value;
//         // $xcatArray = array();
//         // $dataArray = array();
//         // $nameArray = array();
//         // for ($i = 0; $i < count($queryArray); $i++) {
//         //     $responseArray = $this -> um -> runGivenQuery($queryArray[$i]);
//         //     $responseArray = $responseArray[0];
//         //     array_push($dataArray, (float) $responseArray -> { "data".$i } / $doller);
//         //     array_push($xcatArray, number_format((((float) $responseArray -> { "data".$i } / $doller) / 1000000), 2, '.', ''));
//         //     array_push($nameArray, $responseArray -> { "individual_name".$i });
//         // }
//         chart = [];
//         chart.chart.renderTo = "canvas".canvasId;
//         chart.chart.type = "bar";
//         //chart.chart.plotBackgroundImage = null;
//         chart.title.text= ('Date from: '+data.fromDate+' to: '+data.toDate);
//         chart.chart.spacingLeft = 40;
//         chart.chart.marginRight = 85;
//         chart.chart.height = 245;
//         chart.xAxis.categories = xcatArray;
//         chart.xAxis.labels.enabled = false;
//         chart.xAxis.title.text = "";
//         chart.yAxis.title.text = y1_text;
//         chart.yAxis.title.style.color = '#003AFA';
//         chart.yAxis.labels.style.color = '#003AFA';
//         chart.yAxis.gridLineWidth=0;
//         chart.yAxis.minorGridLineWidth= 0;
//         chart.plotOptions.series.colorByPoint = true;
//         chart.plotOptions.series.colorByPoint = true;
//         chart.plotOptions.bar.dataLabels.enabled = true;
//         chart.plotOptions.bar.dataLabels.useHTML = true;
//         chart.plotOptions.bar.dataLabels.padding = 0;
//         chart.plotOptions.bar.dataLabels.color='black';
// //         chart.plotOptions.bar.dataLabels.formatter = new HighchartJsExpr(
// //             "function() {
// //     return '<b>' + this.series.name[this.series.data.indexOf(this.point)] + '</b> ' + this.x + ' Mn USD';
// //     } ");

// //     chart -> tooltip -> formatter = new HighchartJsExpr(
// //         "function() {
// //       return '<b>' + this.series.name[this.series.data.indexOf(this.point)] + '</b><br/> ' + this.x + ' Mn USD';
// // } ");
//         chart.legend.enabled = false;
//         // chart -> legend -> labelFormatter = new HighchartJsExpr(
//         //     "function() {
//         //     return this.color;}");
//         // chart -> colors=colorArr;
//         // chart -> series[] = array(
//         //     'name' => nameArray,
//         //     'color' => array(
//         //         "<b>Net Generation<font></b>",
//         //         "<b>Budget Generation</b>",
//         //         "<b>Forecast Generation</b>"
//         //     ),
//         //     'data' => dataArray
//         // );

//     return chart;// -> render("chart1");

//   }

//   in_array(needle, haystack) {
//     let length = haystack.length;
//     for (let i = 0; i < length; i++) {
//         if (haystack[i] == needle) return true;
//     }
//     return false;
// }

// // /**
// //  * [makegraphplf description]
// //  * @return [type] [description]
// //  */
// makegraphplf(data) {

//     let graphId = data.graphId;
//     let canvasId = data.canvasId;
//     // let plantIds = $this -> input -> post('plantIds');
//     let plantIdsStr = plantIds.split(",");//implode(",", $plantIds);
//     // $graphData = $this -> st -> getGraphByGraphId($graphId);
//     let graphData = data;
//     let date = dat.toDate;
//     let curMonth = date.substring(5,7);//date("m", strtotime($date));
//     let curYear = date.substring(0,4);//date("Y", strtotime($date));
//     let mnthCheck = ["01", "04", "07", "10"];
//     let getQuarter = Math.ceil(curMonth / 3);
//     let interval = data.timeInterval;
//     let arrCntQtr = [1= 4, 2= 1, 3= 2, 4= 3];
//     let sqlJoin = '';
//     let today = new Date();
//     if (this.in_array(curMonth, mnthCheck)) {
//         sqlJoin = FALSE;
//     }
//     else {
//         sqlJoin = TRUE;
//     }
//     let _year = '';
//     let from = '';
//     let date = '';
//     let bdate = '';
//     let ext = '';
//     let budplf = '';
//     let mnArray = '';
//     let budgetArr = '';
//     if (interval == 1) {
//         budplf = 20.62;
//         mnArray = [4, 5, 6];
//         budgetArr = [4= 21.42, 5= 20.68, 6= 19.99];
//         if (getQuarter == 1) {
//             _year = formatDate(dateAdd(today,"year",-1));
//             from = _year.substring(0,4)+"-04-01";
//             date = _year.substring(0,4)+"-06-30";
//             bdate = _year.substring(0,4)+"-06-30";
//             ext = _year.substring(0,4)+'-2';
//         }
//         else if (getQuarter == 3 || getQuarter == 4) {
//             _year = formatDate(today).substring(0,4);
//             from = _year+"-04-01";
//             date = _year+"Y-06-30";
//             bdate = _year+"Y-06-30";
//             ext = _year+"-2";
//         }
//         else {
//             _year = formatDate(today).substring(0,4);
//             from = _year+"-04-01";
//             bdate = _year+"Y-06-30";
//             ext = _year+"-2";
//         }
//     }
//     if (interval == 2) {
//         budplf = 17.05;
//         mnArray = [7, 8, 9];
//         budgetArr = [7= 16.44, 8= 16.10, 9= 18.67];
//         if (getQuarter == 1) {
//             _year = formatDate(dateAdd(today,"year",-1));
//             from = _year.substring(0,4)+"-07-01";
//             date = _year.substring(0,4)+"-09-30";
//             bdate = _year.substring(0,4)+"-09-30";
//             ext = _year.substring(0,4)+'-3';
//         }
//         else if ($getQuarter == 2 || $getQuarter == 4) {
//             _year = formatDate(today).substring(0,4);
//             from = _year+"-07-01";
//             date = _year+"Y-09-30";
//             bdate = _year+"Y-09-30";
//             ext = _year+"-3";
//         }
//         else {
//             _year = formatDate(today).substring(0,4);
//             from = _year+"-07-01";
//             bdate = _year+"Y-09-30";
//             ext = _year+"-3";
//         }
//     }
//     if (interval == 3) {
//         budplf = 19.94;
//         mnArray = [10, 11, 12];
//         budgetArr = [10= 20.78, 11= 19.81, 12= 19.22];
//         if (getQuarter == 1) {
//             _year = formatDate(dateAdd(today,"year",-1));
//             from = _year.substring(0,4)+"-10-01";
//             date = _year.substring(0,4)+"-12-31";
//             bdate = _year.substring(0,4)+"-12-31";
//             ext = _year.substring(0,4)+'-4';
//         }
//         else if (getQuarter == 2 || getQuarter == 3) {
//             _year = formatDate(today).substring(0,4);
//             from = _year+"-10-01";
//             date = _year+"Y-12-31";
//             bdate = _year+"Y-12-31";
//             ext = _year+"-4";
//         }
//         else {
//             _year = formatDate(today).substring(0,4);
//             from = _year+"-10-01";
//             bdate = _year+"Y-12-31";
//             ext = _year+"-4";
//         }
//     }
//     if (interval == 4) {
//         budplf = 21.14;
//         mnArray = [1, 2, 3];
//         budgetArr = [1= 19.92, 2= 21.50, 3= 22.03];

//         if (getQuarter == 1) {
//             _year = formatDate(today).substring(0,4);
//             from = _year+"-01-01";
//             bdate = _year+"Y-03-31";
//             ext = _year+"-1";
//         }
//         else {
//             _year = formatDate(dateAdd(today,"year",1));
//             from = _year.substring(0,4)+"-01-01";
//             date = _year.substring(0,4)+"-03-31";
//             bdate = _year.substring(0,4)+"-03-31";
//             ext = _year.substring(0,4)+'-1';
//         }

//     }

//     //calculation for net plf
//     let time = data.timePeriod;
//     let unit = data.timeGroup;
//     let y1_text = data.y1Title+" ("+data.y1Unit+")";
//     let colorArr = data.colorCode.split(",");//explode(',',$graphData->color_code);
//     let labelArr = data.label.split(",");//explode(',',$graphData->label);
//     let deviceArr = data.device.split('!@#');//explode('!@#',$graphData->device);
//     let deviceTextArr = data.deviceText.split('!@#');//explode('!@#',$graphData->device_text);
//     let channelArr = data.chaneel.split(',');//explode(',',$graphData->channel);
//     let aggregateArr = data.aggregation.split(',');//explode(',',$graphData->aggregation);
//     let plantArr = [];
//     if (data.plant != null) {
//         plantArr = data.plant.split(",");//explode(',', $graphData -> plant);
//     } else {
//         plantArr = [];
//     }
//     let queryArray = [];
//     let select = '';
//     let column = '';
//     for (let i = 0; i < labelArr.length; i++) {
//         if (labelArr[i] == 'Forecast') {
//             if (deviceArr[i] == "net_generation_plf") {
//                 if (aggregateArr[i] == '') {
//                     aggregate = 'SUM';
//                 } else {
//                     aggregate = aggregateArr[i];
//                 }
//                 select = deviceArr[i];
//                 if (select == "net_generation_plf") {
//                     select = 'abs(actual_generation) - abs(import)';
//                 }
//                 column = 'Actual';
//                 // if (plantArr == "") {
//                 //     if ($unit == 'month') {
//                 //         $newDate = date('Y-m-t', strtotime($date." first day of last month"));
//                 //         $currMFday = date('Y-m-01', strtotime($date));
//                 //         $lastMFday = date('Y-m-01', strtotime($date."first day of last month"));
//                 //         $query = '';
//                 //         if ($time == 'quarterly') {
//                 //             if ($interval != $arrCntQtr[$getQuarter]) {
//                 //                 $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i.",p.plant_capacity_ac as plant_capacity_ac".$i.",p.commissioning_date as commissioning_date".$i.",if((month(p.commissioning_date) = month(pg.date) && year(p.commissioning_date) = year(pg.date)),1,0) as status".$i.",p.plant_id as plant_id".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE p.plant_id IN( ".$plantIdsStr.") AND pg.date BETWEEN '".$from."' AND '".$date."' AND data_flag = 2 group by p.plant_id,month(pg.date) ";
//                 //                 $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.",t.month".$i.",sum(t.plant_capacity_ac".$i.") as plant_capacity_ac".$i.",t.commissioning_date".$i." as commissioning_date".$i.",t.status".$i." as status".$i.",t.plant_id".$i." FROM (".$query.") as t group by t.plant_id".$i.",t.month".$i;

//                 //             }
//                 //             else {

//                 //                 if ($sqlJoin) {
//                 //                     $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i.",p.plant_capacity_ac as plant_capacity_ac".$i.",p.commissioning_date as commissioning_date".$i.",if((month(p.commissioning_date) = month(pg.date) && year(p.commissioning_date) = year(pg.date)),1,0) as status".$i.",p.plant_id as plant_id".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE p.plant_id IN( ".$plantIdsStr.") AND pg.date BETWEEN '".$from."' AND '".$newDate."' AND data_flag = 2 group by p.plant_id,month(pg.date) ";
//                 //                     $query.= "UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i.",p.plant_capacity_ac as plant_capacity_ac".$i.",p.commissioning_date as commissioning_date".$i.",if((month(p.commissioning_date) = month(pg.date) && year(p.commissioning_date) = year(pg.date)),1,0) as status".$i.",p.plant_id as plant_id".$i." FROM plant AS p
//                 //                     LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
//                 //                     LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id IN(".$plantIdsStr .") group by p.plant_id";
//                 //                     $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.",t.month".$i.",sum(t.plant_capacity_ac".$i.") as plant_capacity_ac".$i.",t.commissioning_date".$i." as commissioning_date".$i.",t.status".$i." as status".$i.",t.plant_id".$i." FROM (".$query.") as t group by t.plant_id".$i.",t.month".$i;
//                 //                 }
//                 //                 else {
//                 //                     $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i.",p.plant_capacity_ac as plant_capacity_ac".$i.",p.commissioning_date as commissioning_date".$i.",if((month(p.commissioning_date) = month(pg.date) && year(p.commissioning_date) = year(pg.date)),1,0) as status".$i.",p.plant_id as plant_id".$i." FROM plant AS p
//                 //                     LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
//                 //                     LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE  p.plant_id IN(".$plantIdsStr .") group by p.plant_id";
//                 //                     $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.",t.month".$i.",sum(t.plant_capacity_ac".$i.") as plant_capacity_ac".$i.",t.commissioning_date".$i." as commissioning_date".$i.",t.status".$i." as status".$i.",t.plant_id".$i." FROM (".$query.") as t group by t.plant_id".$i.",t.month".$i;
//                 //                 }
//                 //             }
//                 //         }
//                 //     }
//                 // }
//                 let net_generation = 0;
//                 // let netArray = $this -> um -> runGivenQuery($query);
//                 // let totalNet = array_fill_keys($mnArray, '');
//                 // let totalAc = array_fill_keys($mnArray, '');
//                 let totalAcPid = [];
//                 let netDays = [];
//                 // let qtrDays = abs(round((strtotime($date) - strtotime($from)) / 86400)) + 1;
//                 // $this -> load -> helper('customdate');
//                 // $result = dateRange($from, $date);
//                 // $totdays = array_fill_keys($mnArray, '');
//                 result.forEach(k => {
//                     if (k['data_type'] == 1) {
//                         mnt = date('n', strtotime($k['end']));
//                         totdays[mnt] = date('d', strtotime(k['end']));
//                     }
//                     else if (k['data_type'] == 2) {
//                         mnt = date('n', strtotime(k['end']));
//                         totdays[mnt] = date('d', strtotime(k['end']));
//                     }
//                 }
//                 netArray.forEach(net => {
//                 {
//                     if (net == data[i]) {
//                         net_generation += net -> { 'data'[i] };
//                         totalNet[$net -> { 'month'.$i }] += $net -> { 'data'.$i };
//                         if ($net -> { 'status'.$i } == 1) {
//                             if (!empty($totdays[$net -> { 'month'.$i }])) {
//                                 $com_days = date('d', strtotime($net -> { 'commissioning_date'.$i }));
//                                 $pg_days = $totdays[$net -> { 'month'.$i }];
//                                 if ($com_days < $pg_days) {
//                                     $rest_days = $pg_days - $com_days;
//                                     $totalAc[$net -> { 'month'.$i }] += ($rest_days * $net -> { 'plant_capacity_ac'.$i }) / $pg_days;
//                                 }
//                             }
//                         } else {
//                             $totalAc[$net -> { 'month'.$i }] += $net -> { 'plant_capacity_ac'.$i };
//                         }
//                     }
//                 }

//                 $netArr = array();
//                 foreach($mnArray as $mn => $m){
//                     $netArr[$m] = number_format(@($totalNet[$m] / (24 * $totdays[$m] * $totalAc[$m])) * 100, 2, '.', '');
//                 }

//             }
//         }
//     }

//     if (count($totalAc) > 0) {
//         $avg = count(array_filter($totdays));
//         $totalACQtr = array_sum($totalAc) / $avg;
//     }
//     else { $totalACQtr = 0; }
//     $netplf = @($net_generation / (24 * $qtrDays * $totalACQtr)) * 100;
//     $max = number_format($budplf, 2, '.', '');
//     $threePFive = ($budplf - ($budplf * 0.035));
//     $nxtthreePFive = ($threePFive - ($threePFive * 0.035));
//     $firstPlotBands = number_format($threePFive, 2, '.', '');
//     $secPlotBands = number_format($nxtthreePFive, 2, '.', '');
//     $net_plf = number_format($netplf, 2, '.', '');

//     $chart = new Highchart();
//     $chart -> includeExtraScripts();
//     $chart -> chart = array(
//         'renderTo'=> "canvas".$canvasId,
//         'type' => 'gauge',
//         'spacingTop' => 10,
//         'spacingLeft' => 15,
//         'height' => 245
//     );
//     $chart -> title -> text= 'Date from: '.date('d/m/Y', strtotime($from)). ' to: '.date('d/m/Y', strtotime($date));
//     $chart -> title -> style = array('color'=> '#666', 'fontWeight'=> 'normal', 'fontSize'=> 13);
//     $chart -> title -> margin = 10;
//     $chart -> title -> align = 'center';
//     $chart -> legend -> allowDecimals=false;
//     $chart -> legend -> itemWidth=150;
//     $chart -> legend -> itemStyle=array("cursor"=> 'default', "color"=> 'black', "fontWeight"=> 'bold');
//     $chart -> legend -> align='right';
//     $chart -> legend -> verticalAlign='top';
//     $chart -> legend -> layout='vertical';
//     $chart -> legend -> x=0;
//     $chart -> legend -> y=150;
//     $chart -> legend -> useHTML=true;
//     $chart -> legend -> floating=true;
//     $chart -> legend -> borderRadius=0;
//     $chart -> legend -> borderWidth=0;
//     $chart -> legend -> labelFormatter = new HighchartJsExpr("function () {
//           return this.yData + ' % <br/>' + this.name;
// } "
//       );



// $chart -> pane -> startAngle = -150;
// $chart -> pane -> endAngle = 150;
// $chart -> background = array(
//     array(
//         'backgroundColor' => array(
//             'linearGradient' => array(
//                 'x1' => 0,
//                 'y1' => 0,
//                 'x2' => 0,
//                 'y2' => 1
//             ),
//             'stops' => array(
//                 array(0, '#FFF'),
//                 array(1, '#333')
//             )
//         ),
//         'borderWidth' => 0,
//         'outerRadius' => '109%'
//     ),
//     array(
//         'backgroundColor' => array(
//             'linearGradient' => array(
//                 'x1' => 0,
//                 'y1' => 0,
//                 'x2' => 0,
//                 'y2' => 1
//             ),
//             'stops' => array(
//                 array(0, '#333'),
//                 array(1, '#FFF')
//             )
//         ),
//         'borderWidth' => 1,
//         'outerRadius' => '107%'
//     ),
//     array(),
//     array(
//         'backgroundColor' => '#DDD',
//         'borderWidth' => 0,
//         'outerRadius' => '105%',
//         'innerRadius' => '103%'
//     )
// );
// if ((float)$net_plf != 0 || (float)$net_plf != NULL || (float)$net_plf != "0.00")
// {
//     $chart -> yAxis -> min=5;
// }
//   else
// {
//     $chart -> yAxis -> min=0;
// }
// $chart -> yAxis -> minorTickInterval= 'auto';
// $chart -> yAxis -> minorTickWidth= 1;
// $chart -> yAxis -> minorTickLength= 10;
// $chart -> yAxis -> minorTickPosition= 'inside';
// $chart -> yAxis -> minorTickColor= '#666';
// $chart -> yAxis -> tickPixelInterval= 30;
// $chart -> yAxis -> tickWidth= 2;
// $chart -> yAxis -> tickPosition= 'inside';
// $chart -> yAxis -> tickLength= 10;
// $chart -> yAxis -> tickColor= '#666';
// $chart -> yAxis -> labels= array("step"=> 3, "rotation"=> "auto");
// $chart -> yAxis -> title -> text="PLF (%)";
// $chart -> yAxis -> title -> y=20;
// $chart -> yAxis -> title -> style = array('color'=> 'blue', 'width'=> 30, 'fontWeight'=> 'normal', 'fontSize'=> '8px');


// if ($max != 0 || $max != NULL) {
//     $chart -> yAxis -> max=max($max, $net_plf, $budplf);
//     $chart -> subtitle -> text= '<span style="background-color: #55BF3B;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
//         number_format($firstPlotBands, 1, '.', '').' - '.number_format($max, 1, '.', '').'</span><br>'.
//         '<span style="background-color: #ffbf00;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
//         number_format($secPlotBands, 1, '.', '').' - '.number_format($firstPlotBands, 1, '.', '').'</span><br>'.
//             '<span style="background-color: #DF5353;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
//                 '0 - '.number_format($secPlotBands, 1, '.', '').'</span><br>';
//     if ($net_plf >= $firstPlotBands) {
//         $color = '#55BF3B';
//     } elseif($net_plf < $firstPlotBands && $net_plf >= $secPlotBands){
//         $color = '#ffbf00';
//     }else {
//         $color = '#DF5353';
//     }

//     $chart -> subtitle -> useHTML= true;
//     $chart -> subtitle -> verticalAlign='top';
//     $chart -> subtitle -> x=10;
//     $chart -> subtitle -> y=120;
//     $chart -> subtitle -> align='left';
//     $chart -> yAxis -> plotBands[]=array("color"=> '#55BF3B', "from"=> $firstPlotBands, "to"=> max($max, $net_plf, $budplf));
//     $chart -> yAxis -> plotBands[]=array("color"=> '#ffbf00', "from"=> $secPlotBands, "to"=> $firstPlotBands);
//     $chart -> yAxis -> plotBands[]=array("color"=> '#DF5353', "from"=> 0.0, "to"=> $secPlotBands);
// }
// $chart -> series[]=array("name"=> 'Net PLF',
//     "showInLegend"=> true,
//     "color"=> '#4141FF',
//     "data"=> array(array("y"=>(float)$net_plf, "color"=> '#4141FF')),
//     "dial"=> array("backgroundColor"=> '#4141FF', "radius"=> "85%", "rearLength"=> "0%"),
//     "dataLabels" => array(
//         'formatter' => new HighchartJsExpr("function () {
//                                  return '<span style=\"color:" . $color . "\">".$net_plf." %</span><br/>'; }"
//                              )),
// 'tooltip' => array(
//     'valueSuffix' => '% '
// ));

// $chart -> series[]=array("name"=> 'Budget PLF',
//     "showInLegend"=> true,
//     "color"=> '#FFC200',
//     "data"=> array(array("y"=>(float)$budplf, "color"=> '#FFC200')),
//     "dial"=> array("backgroundColor"=> '#FFC200', "radius"=> "85%", "rearLength"=> "0%"),
//     "dataLabels"=> array("enabled"=> false),
//     'tooltip' => array(
//         'valueSuffix' => '% '
//     ));
// $chart -> exporting -> buttons -> customButton -> x=-17;
// $chart -> exporting -> buttons -> customButton -> y=-17;
// $chart -> exporting -> buttons -> customButton -> align='right';
// $chart -> exporting -> buttons -> customButton -> verticalAlign='top';
// $chart -> exporting -> buttons -> customButton -> onclick=new HighchartJsExpr(
//     "function() {
//                         window.open('/report/DeviateExcelExportEXT/QTD/".$ext."', '_blank');}");
// $chart -> exporting -> buttons -> customButton -> text= 'Dev <br/>Report';

// echo $chart -> render("chart1");
// foreach($mnArray as $k=> $v){
//     $budgetArrplf = $budgetArr[$v];
//     $maxpt = number_format($budgetArrplf, 2, '.', '');
//     $threePFivept = ($budgetArrplf - ($budgetArrplf * 0.035));
//     $nxtthreePFivept = ($threePFivept - ($threePFivept * 0.035));
//     $firstPlotBandspt = number_format($threePFivept, 2, '.', '');
//     $secPlotBandspt = number_format($nxtthreePFivept, 2, '.', '');
//     $net_generationpt = $netArr[$v];
//     $budget_generationpt = $budgetArr[$v];

//     /*  foreach($mnArray as $k=>$v)
//       {
//         if(isset($budgetArr[$v]) || isset($budDays[$v]) || isset($budCapAC[$v]) )
//         {
//         $budgetArrplf= @($budgetArr[$v]/(24*$budDays[$v]*$budCapAC[$v]))*100;
//         $maxpt = number_format($budgetArrplf,2,'.','');
//         $threePFivept = ($budgetArrplf-($budgetArrplf*0.035));
//         $nxtthreePFivept = ($threePFivept-($threePFivept*0.035));
//         $firstPlotBandspt = number_format($threePFivept,2,'.','');
//         $secPlotBandspt = number_format($nxtthreePFivept,2,'.','');
//       }
//         else {
//           $maxpt = 0.0;
//           $threePFivept = 0.0;
//           $nxtthreePFivept = 0.0;
//           $firstPlotBandspt = 0.0;
//           $secPlotBandspt = 0.0;
//         }
//         if(isset($totalNet[$v]) )
//         {
//           $levelised_day = @($totalAcDays[$v]/$totalACVal);
//           $netArrplf= @($totalNet[$v]/(24*$levelised_day*$totalACVal))*100;
//           $net_generationpt = number_format($netArrplf,2,'.','');
//         }
//         else {
//           $net_generationpt =0;
//         }
//         if(isset($forecastArr[$v]) )
//         {
//           $levelised_day = @($totalAcDays[$v]/$totalACVal);
//           $forecastArrplf= @($forecastArr[$v]/(24*$foreDays[$v]*$totalACVal))*100;
//           $forecast_generationpt = number_format($forecastArrplf,2,'.','');
//         }
//         else {
//           $forecast_generationpt =0;
//         }*/
//     $chart2 = new Highchart();
//     $chart2 -> includeExtraScripts();
//     $chart2 -> chart = array(
//         'renderTo'=> "canvas".++$k.$canvasId,
//         'type' => 'gauge',
//         'spacingTop' => 10,
//         //'spacingLeft' => 0,
//         'width' => 200,
//         'height' => 265
//     );
//     $chmonth = $v + 1;
//     $chart2 -> title -> text= date('F', mktime(0, 0, 0, $chmonth, 0, 0));
//     $chart2 -> title -> style = array('color'=> '#666', 'fontWeight'=> 'normal', 'width'=> '150px', 'fontSize'=> 13);
//     $chart2 -> title -> margin = 10;
//     $chart2 -> title -> align = 'center';
//     $chart2 -> legend -> allowDecimals=false;
//     $chart2 -> legend -> itemWidth=150;
//     $chart2 -> legend -> itemStyle=array("cursor"=> 'default', "color"=> 'black');
//     $chart2 -> legend -> align='bottom';
//     $chart2 -> legend -> verticalAlign='top';
//     $chart2 -> legend -> layout='vertical';
//     $chart2 -> legend -> x=0;
//     $chart2 -> legend -> y=210;
//     $chart2 -> legend -> useHTML=true;
//     $chart2 -> legend -> floating=true;
//     $chart2 -> legend -> borderRadius=0;
//     $chart2 -> legend -> borderWidth=0;
//     $chart2 -> legend -> labelFormatter = new HighchartJsExpr("function () {
//             return '<span style=\"font-size:9px; border-radius: 2px; padding: 1px 2px;\">' + this.yData + ' % ' + this.name + '</span>';
// } "
//         );

// $chart2 -> pane -> startAngle = -150;
// $chart2 -> pane -> endAngle = 150;
// $chart2 -> background = array(
//     array(
//         'backgroundColor' => array(
//             'linearGradient' => array(
//                 'x1' => 0,
//                 'y1' => 0,
//                 'x2' => 0,
//                 'y2' => 1
//             ),
//             'stops' => array(
//                 array(0, '#FFF'),
//                 array(1, '#333')
//             )
//         ),
//         'borderWidth' => 0,
//         'outerRadius' => '109%'
//     ),
//     array(
//         'backgroundColor' => array(
//             'linearGradient' => array(
//                 'x1' => 0,
//                 'y1' => 0,
//                 'x2' => 0,
//                 'y2' => 1
//             ),
//             'stops' => array(
//                 array(0, '#333'),
//                 array(1, '#FFF')
//             )
//         ),
//         'borderWidth' => 1,
//         'outerRadius' => '107%'
//     ),
//     array(),
//     array(
//         'backgroundColor' => '#DDD',
//         'borderWidth' => 0,
//         'outerRadius' => '105%',
//         'innerRadius' => '103%'
//     )
// );

// if ((float)$net_generationpt != 0 || (float)$net_generationpt != NULL || (float)$net_generationpt != "0.00")
// {
//     $chart2 -> yAxis -> min=5;
// }
//     else
// {
//     $chart2 -> yAxis -> min=0;
// }
// $chart2 -> yAxis -> minorTickInterval= 'auto';
// $chart2 -> yAxis -> minorTickWidth= 1;
// $chart2 -> yAxis -> minorTickLength= 10;
// $chart2 -> yAxis -> minorTickPosition= 'inside';
// $chart2 -> yAxis -> minorTickColor= '#666';
// $chart2 -> yAxis -> tickPixelInterval= 30;
// $chart2 -> yAxis -> tickWidth= 2;
// $chart2 -> yAxis -> tickPosition= 'inside';
// $chart2 -> yAxis -> tickLength= 10;
// $chart2 -> yAxis -> tickColor= '#666';
// $chart2 -> yAxis -> labels= array("step"=> 3, "rotation"=> "auto");
// $chart2 -> yAxis -> title -> text="PLF (%)";
// $chart2 -> yAxis -> title -> y=20;
// $chart2 -> yAxis -> title -> style = array('color'=> 'blue', 'width'=> 30, 'fontWeight'=> 'normal', 'fontSize'=> '8px');


// if ($max != 0 || $max != NULL) {
//     $chart2 -> yAxis -> max=max($maxpt, $net_generationpt, $budget_generationpt);
//     $chart2 -> subtitle -> text= '<span style="background-color: #55BF3B;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
//         number_format($firstPlotBandspt, 1, '.', '').' - '.number_format($maxpt, 1, '.', '').'</span>'.
//           '<span style="background-color: #ffbf00;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
//         number_format($secPlotBandspt, 1, '.', '').' - '.number_format($firstPlotBandspt, 1, '.', '').'</span>'.
//               '<span style="background-color: #DF5353;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
//                   '0 - '.number_format($secPlotBandspt, 1, '.', '').'</span><br>';

//     $chart2 -> subtitle -> useHTML= true;
//     $chart2 -> subtitle -> verticalAlign='top';
//     $chart2 -> subtitle -> x=-5;
//     $chart2 -> subtitle -> y=40;
//     $chart2 -> subtitle -> textOverflow = "none";
//     $chart2 -> subtitle -> whiteSpace= 'nowrap';
//     $chart2 -> yAxis -> plotBands[]=array("color"=> '#55BF3B', "from"=> $firstPlotBandspt, "to"=> max($maxpt, $net_generationpt, $budget_generationpt));
//     $chart2 -> yAxis -> plotBands[]=array("color"=> '#ffbf00', "from"=> $secPlotBandspt, "to"=> $firstPlotBandspt);
//     $chart2 -> yAxis -> plotBands[]=array("color"=> '#DF5353', "from"=> 0.0, "to"=> $secPlotBandspt);
// }

// if ($net_generationpt >= $firstPlotBandspt) {
//     $color = '#55BF3B';
// } elseif($net_generationpt < $firstPlotBandspt && $net_generationpt >= $secPlotBandspt){
//     $color = '#ffbf00';
// }else {
//     $color = '#DF5353';
// }

// $chart2 -> series[]=array("name"=> 'Net PLF',
//     "showInLegend"=> true,
//     "color"=> '#4141FF',
//     "data"=> array(array("y"=>(float)$net_generationpt, "color"=> '#4141FF')),
//     "dial"=> array("backgroundColor"=> '#4141FF', "radius"=> "85%", "rearLength"=> "0%"),
//     "dataLabels" => array(
//         'formatter' => new HighchartJsExpr("function () {
//                                    return '<span style=\"color:" . $color . "\">".$net_generationpt." %</span><br/>'; }"
//                                )),
// 'tooltip' => array(
//     'valueSuffix' => '% '
// ));

// $chart2 -> series[]=array("name"=> 'Budget PLF',
//     "showInLegend"=> true,
//     "color"=> '#FFC200',
//     "data"=> array(array("y"=>(float)$budget_generationpt, "color"=> '#FFC200')),
//     "dial"=> array("backgroundColor"=> '#FFC200', "radius"=> "85%", "rearLength"=> "0%"),
//     "dataLabels"=> array("enabled"=> false),
//     'tooltip' => array(
//         'valueSuffix' => '% '
//     ));
// echo $chart2 -> render("chart1");
//     }


//   }

// // /** Function to show comparison popup **/
// // public function compareGCGraph() {
// //     $graphId = base64_decode($this -> input -> post('graph'));
// //     $canvasId = $this -> input -> post('canvas');
// //     $graphData = $this -> st -> getGraphByGraphId($graphId);
// //     $graphData = $graphData[0];
// //     $date = $this -> hgm -> getEnday($graphData);

// //     $curMonth = date("m", strtotime($date));
// //     $curYear = date("Y", strtotime($date));
// //     $getQuarter = ceil($curMonth / 3);

// //     list($from, $date, $bdate) = $this -> hgm -> getActualDates($graphData -> time_interval, $getQuarter, $date);

// //     $chart = $this -> hgm -> genGCGraphData($graphData, $from, $date, $bdate, $canvasId, '');
// //     echo $chart -> render("chart1");

// //     $from = date("Y-m-d", strtotime($from. " -1 year"));
// //     $date = date("Y-m-d", strtotime($bdate. " -1 year"));
// //     $bdate = date("Y-m-d", strtotime($bdate. " -1 year"));

// //     $chart = $this -> hgm -> genGCGraphData($graphData, $from, $date, $bdate, $canvasId, 2);
// //     echo $chart -> render("chart1");
// // }

// // /** Function to show comparison popup **/

// // public function compareRCGraph() {
// //     $graphId = base64_decode($this -> input -> post('graph'));
// //     $canvasId = $this -> input -> post('canvas');
// //     $graphData = $this -> st -> getGraphByGraphId($graphId);
// //     $graphData = $graphData[0];
// //     $date = $this -> hgm -> getEnday($graphData);

// //     $curMonth = date("m", strtotime($date));
// //     $curYear = date("Y", strtotime($date));
// //     $getQuarter = ceil($curMonth / 3);

// //     list($from, $date, $bdate) = $this -> hgm -> getActualDates($graphData -> time_interval, $getQuarter, $date);

// //     $chart = $this -> hgm -> genRCGraphData($graphData, $from, $date, $bdate, $canvasId, '');
// //     echo $chart -> render("chart1");

// //     $from = date("Y-m-d", strtotime($from. " -1 year"));
// //     $date = date("Y-m-d", strtotime($date. " -1 year"));
// //     $bdate = date("Y-m-d", strtotime($bdate. " -1 year"));

// //     $chart = $this -> hgm -> genRCGraphData($graphData, $from, $date, $bdate, $canvasId, 2);
// //     echo $chart -> render("chart1");
// // }


// // /**
// //  * [makeGraphfgauge generation comparison based on quarters]
// //  * @return [type] []
// //  */
// // public function makeGraphfgauge() {
// //     $graphId = base64_decode($this -> input -> post('graph'));
// //     $plantIds = $this -> input -> post('plantIds');
// //     $plantIdsStr = implode(",", $plantIds);

// //     $canvasId = $this -> input -> post('canvas');
// //     $graphData = $this -> st -> getGraphByGraphId($graphId);
// //     $graphData = $graphData[0];
// //     $date = $this -> hgm -> getEnday($graphData);
// //     $curMonth = date("m", strtotime($date));
// //     $curYear = date("Y", strtotime($date));
// //     $mnthCheck = array("01", "04", "07", "10");
// //     $getQuarter = ceil($curMonth / 3);
// //     $interval = $graphData -> time_interval;
// //     $arrCntQtr = array(1=> 4, 2=> 1, 3=> 2, 4=> 3);
// //     $checkQtr = false;
// //     if (in_array($curMonth, $mnthCheck)) {
// //         $sqlJoin = FALSE;
// //     }
// //     else {
// //         $sqlJoin = TRUE;
// //     }

// //     if ($interval == 1) {
// //         $mnArray = array(4, 5, 6);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-04-01', strtotime("-1 year"));
// //             $date = date('Y-06-30', strtotime("-1 year"));
// //             $bdate = date('Y-06-30', strtotime("-1 year"));
// //             $ext = date('Y', strtotime("-1 year")).'-2';
// //         }
// //         else if ($getQuarter == 3 || $getQuarter == 4) {
// //             $from = date('Y-04-01');
// //             $date = date('Y-06-30');
// //             $bdate = date('Y-06-30');
// //             $ext = date('Y').'-2';
// //         }
// //         else {
// //             $from = date('Y-04-01');
// //             $bdate = date('Y-06-30');
// //             $ext = date('Y').'-2';
// //         }
// //     }
// //     if ($interval == 2) {
// //         $mnArray = array(7, 8, 9);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-07-01', strtotime("-1 year"));
// //             $date = date('Y-09-30', strtotime("-1 year"));
// //             $bdate = date('Y-09-30', strtotime("-1 year"));
// //             $ext = date('Y', strtotime("-1 year")).'-3';
// //         }
// //         else if ($getQuarter == 2 || $getQuarter == 4) {
// //             $from = date('Y-07-01');
// //             $date = date('Y-09-30');
// //             $bdate = date('Y-09-30');
// //             $ext = date('Y').'-3';
// //         }
// //         else {
// //             $from = date('Y-07-01');
// //             $bdate = date('Y-09-30');
// //             $ext = date('Y').'-3';
// //         }
// //     }
// //     if ($interval == 3) {
// //         $mnArray = array(10, 11, 12);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-10-01', strtotime("-1 year"));
// //             $date = date('Y-12-31', strtotime("-1 year"));
// //             $bdate = date('Y-12-31', strtotime("-1 year"));
// //             $ext = date('Y', strtotime("-1 year")).'-4';
// //         }
// //         else if ($getQuarter == 2 || $getQuarter == 3) {
// //             $from = date('Y-10-01');
// //             $date = date('Y-12-31');
// //             $bdate = date('Y-12-31');
// //             $ext = date('Y').'-4';
// //         }
// //         else {
// //             $from = date('Y-10-01');
// //             $bdate = date('Y-12-31');
// //             $ext = date('Y').'-4';
// //         }
// //     }
// //     if ($interval == 4) {
// //         $mnArray = array(1, 2, 3);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-01-01');
// //             $bdate = date('Y-03-31');
// //             $ext = date('Y').'-1';
// //         }
// //         else {
// //             $from = date('Y-01-01', strtotime("+1 year"));
// //             $date = date('Y-03-31', strtotime("+1 year"));
// //             $bdate = date('Y-03-31', strtotime("+1 year"));
// //             $ext = date('Y', strtotime("+1 year")).'-1';
// //         }

// //     }

// //     //// Tmperorary
// //     if ($interval == $arrCntQtr[$getQuarter]) {
// //         $cndn = 0;
// //     }
// //     else if ($interval > $arrCntQtr[$getQuarter]) {
// //         $cndn = 1;
// //     }
// //     else if ($interval < $arrCntQtr[$getQuarter]) {
// //         $cndn = -1;
// //     }
// //     $time = $graphData -> time_period;
// //     $unit = $graphData -> time_group;
// //     $y1_text = $graphData -> y1_title." (".$graphData -> y1_unit.")";
// //     $colorArr = explode(',', $graphData -> color_code);
// //     $labelArr = explode(',', $graphData -> label);
// //     $deviceArr = explode('!@#', $graphData -> device);
// //     $deviceTextArr = explode('!@#', $graphData -> device_text);
// //     $channelArr = explode(',', $graphData -> channel);
// //     $aggregateArr = explode(',', $graphData -> aggregation);
// //     $colorArr = explode(',', $graphData -> color_code);

// //     if ($graphData -> plant != NULL) {
// //         $plantArr = explode(',', $graphData -> plant);
// //     } else {
// //         $plantArr = array();
// //     }
// //     $queryArray = array();

// //     for ($i = 0; $i < count($labelArr); $i++) {
// //         if ($labelArr[$i] == 'Forecast') {
// //             if ($deviceArr[$i] == "forecast_generation") {

// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "forecast_generation") {
// //                     $select = 'forecast_generation';
// //                     $type = 'Budget';
// //                 }
// //                 $column = 'Forecast';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'month') {
// //                         if ($time == 'quarterly') {
// //                             $query = '';
// //                             $query = " SELECT '".$column."' as individual_name".$i.",".$aggregate."(ld.generation) as data".$i.",ld.year as year".$i.",ld.month as month".$i." FROM plant AS p INNER JOIN lender_detail AS ld ON p.plant_id=ld.plant_id WHERE ld.type='Budget' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$bdate."' AND p.plant_id !=22 AND p.plant_id !=5  AND p.plant_id IN( ".$plantIdsStr.") GROUP BY ld.year,ld.month ";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." ,  t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                             $queryArray[$i] = $query;
// //                         }
// //                     }
// //                 }
// //             }
// //             else if ($deviceArr[$i] == "net_generation") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "net_generation") {

// //                     $select = 'actual_generation - import';
// //                 }
// //                 $column = 'Actual';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'month') {
// //                         $newDate = date('Y-m-t', strtotime($date." first day of last month"));
// //                         $currMFday = date('Y-m-01', strtotime($date));
// //                         $lastMFday = date('Y-m-01', strtotime($date."first day of last month"));
// //                         $query = '';
// //                         if ($time == 'quarterly') {
// //                             if ($interval != $arrCntQtr[$getQuarter]) {
// //                                 $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE pg.date BETWEEN '".$from."' AND '".$date."' AND data_flag = 2 AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") GROUP BY YEAR(pg.date),MONTH(pg.date)";
// //                                 $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;

// //                             }
// //                             else {

// //                                 if ($sqlJoin) {
// //                                     $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE pg.date BETWEEN '".$from."' AND '".$newDate."' AND data_flag = 2 AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") GROUP BY YEAR(pg.date),MONTH(pg.date)";
// //                                     $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
// //                                     LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
// //                                     LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52  AND p.plant_id IN(".$plantIdsStr .") GROUP BY YEAR(pg.date), MONTH(pg.date)";
// //                                     $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                                 }
// //                                 else {
// //                                     $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
// //                                     LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
// //                                     LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52 AND p.plant_id IN(".$plantIdsStr .") GROUP BY YEAR(pg.date), YEAR(pg.date)";
// //                                     $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                                 }
// //                             }
// //                         }
// //                     }
// //                     $queryArray[$i] = $query;
// //                 }
// //             }
// //             else if ($deviceArr[$i] == "generation_budget") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "generation_budget") {
// //                     $select = 'budget_generation';
// //                 }
// //                 $column = 'Budget';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'month') {
// //                         $query = '';
// //                         if ($time == 'quarterly') {
// //                             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select.") as data".$i.",f.year as year".$i.",f.month as month".$i." FROM extended_budget f INNER JOIN plant p ON p.plant_id = f.plant_id WHERE STR_TO_DATE( CONCAT( f.year,  '-', f.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$bdate."' AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") GROUP BY f.year,f.month ";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i.",t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                         }
// //                         $queryArray[$i] = $query;
// //                     }
// //                 }
// //             }
// //         }
// //     }

// //     $BudVal = 0;
// //     $netVal = 0;
// //     $forecastVal = 0;
// //     $net_generation = 0;
// //     $forecast_generation = 0;
// //     $budgetArr = array();
// //     $netArr = array();
// //     $forecastArr = array();

// //     for ($i = 0; $i < count($queryArray); $i++) {
// //         $responseArrayTotal = $this -> um -> runGivenQuery($queryArray[$i]);
// //         if (!empty($responseArrayTotal)) {
// //             $j = 0;
// //             foreach($responseArrayTotal as $responseArray)
// //             {
// //                 if ($responseArray -> { "individual_name".$i } == "Budget") {
// //                     $BudVal += (float) $responseArray -> { "data".$i };
// //                     $budgetArr[$responseArray -> { "month".$i }] = (float) $responseArray -> { "data".$i };
// //                 }
// //                 if ($responseArray -> { "individual_name".$i } == "Actual") {
// //                     $netVal += (float) $responseArray -> { "data".$i };
// //                     $netArr[$responseArray -> { "month".$i }] = (float) $responseArray -> { "data".$i };

// //                     if ($cndn == -1) {
// //                         if (in_array($j, array(0, 1))) {
// //                             $forecastVal += (float) $responseArray -> { "data".$i };
// //                         }
// //                     }
// //                     else if ($cndn == 0) {
// //                         if ($curMonth > (integer) $responseArray -> { "month".$i })
// //                         {
// //                             $forecastVal += (float) $responseArray -> { "data".$i };
// //                         }
// //                     }
// //                 }
// //                 if ($responseArray -> { "individual_name".$i } == "Forecast") {
// //                     if ($cndn == 1) {
// //                         $forecastVal += (float) $responseArray -> { "data".$i };
// //                     }
// //                     else if ($cndn == 0) {
// //                         if ($curMonth <= (integer) $responseArray -> { "month".$i })
// //                         {
// //                             $forecastVal += (float) $responseArray -> { "data".$i };
// //                         }
// //                     }
// //                     else if ($cndn == -1) {
// //                         if (in_array($j, array(2))) {
// //                             $forecastVal += (float) $responseArray -> { "data".$i };
// //                         }
// //                     }
// //                     $forecastArr[$responseArray -> { "month".$i }] = (float) $responseArray -> { "data".$i };

// //                 }
// //                 $j++;
// //             }
// //         }
// //     }


// //     $max = number_format(($BudVal / 1000000), 3, '.', '');
// //     $threePFive = ($BudVal - ($BudVal * 0.035));
// //     $nxtthreePFive = ($threePFive - ($threePFive * 0.035));
// //     $firstPlotBands = number_format(($threePFive / 1000000), 3, '.', '');
// //     $secPlotBands = number_format(($nxtthreePFive / 1000000), 3, '.', '');
// //     $net_generation = number_format(((float) $netVal / 1000000), 2, '.', '');
// //     $forecast_generation = number_format(((float) $forecastVal / 1000000), 2, '.', '');
// //     if ($checkQtr) {
// //         $actualBudgetVal = $this -> hgm -> getYrBudgetGen($from, $date, $plantIds);
// //         $actualBudgetVal = number_format(($actualBudgetVal / 1000000), 2, '.', '');
// //     }

// //     $chart = new Highchart();
// //     $chart -> includeExtraScripts();
// //     $chart -> chart = array(
// //         'renderTo'=> "canvas".$canvasId,
// //         'type' => 'gauge',
// //         'spacingTop' => 10,
// //         'spacingLeft' => 15,
// //         'height' => 245
// //     );
// //     $chart -> title -> text= 'Date from: '.date('d/m/Y', strtotime($from)). ' to: '.date('d/m/Y', strtotime($date));
// //     $chart -> title -> style = array('color'=> '#666', 'font'=> 'normal 14px', 'fontSize'=> 13);
// //     $chart -> title -> margin = 10;
// //     $chart -> title -> align = 'center';
// //     $chart -> legend -> allowDecimals=false;
// //     $chart -> legend -> itemWidth=150;
// //     $chart -> legend -> itemStyle=array("cursor"=> 'default', "color"=> 'black', "font" => "9pt Trebuchet MS, Verdana, sans-serif", "fontWeight"=> 'bold');
// //     $chart -> legend -> verticalAlign='top';
// //     $chart -> legend -> layout='vertical';
// //     $chart -> legend -> x=375;
// //     $chart -> legend -> align='left';
// //     $chart -> legend -> y=30;
// //     $chart -> legend -> useHTML=true;
// //     $chart -> legend -> floating=true;
// //     $chart -> legend -> borderRadius=0;
// //     $chart -> legend -> borderWidth=0;
// //     $chart -> legend -> labelFormatter = new HighchartJsExpr("function () {
// //         return this.yData + ' MU ' + this.name;
// // } "
// //     );



// // $chart -> pane -> startAngle = -150;
// // $chart -> pane -> endAngle = 150;
// // $chart -> background = array(
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#FFF'),
// //                 array(1, '#333')
// //             )
// //         ),
// //         'borderWidth' => 0,
// //         'outerRadius' => '109%'
// //     ),
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#333'),
// //                 array(1, '#FFF')
// //             )
// //         ),
// //         'borderWidth' => 1,
// //         'outerRadius' => '107%'
// //     ),
// //     array(),
// //     array(
// //         'backgroundColor' => '#DDD',
// //         'borderWidth' => 0,
// //         'outerRadius' => '105%',
// //         'innerRadius' => '103%'
// //     )
// // );

// // $chart -> yAxis -> min=0;
// // $chart -> yAxis -> minorTickInterval= 'auto';
// // $chart -> yAxis -> minorTickWidth= 1;
// // $chart -> yAxis -> minorTickLength= 10;
// // $chart -> yAxis -> minorTickPosition= 'inside';
// // $chart -> yAxis -> minorTickColor= '#666';
// // $chart -> yAxis -> tickPixelInterval= 30;
// // $chart -> yAxis -> tickWidth= 2;
// // $chart -> yAxis -> tickPosition= 'inside';
// // $chart -> yAxis -> tickLength= 10;
// // $chart -> yAxis -> tickColor= '#666';
// // $chart -> yAxis -> labels= array("step"=> 3, "rotation"=> "auto");
// // $chart -> yAxis -> title -> text="Generation (Kwh)";
// // $chart -> yAxis -> title -> y=20;
// // $chart -> yAxis -> title -> style = array('color'=> 'blue', 'width'=> 30, 'fontWeight'=> 'normal', 'fontSize'=> '8px');


// // if ($max != 0 || $max != NULL) {
// //     $chart -> yAxis -> max=max($max, $net_generation, $forecast_generation);
// //     $subtitleText = '<span style="background-color: #55BF3B;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($firstPlotBands, 1, '.', '').' - '.number_format($max, 1, '.', '').'</span><br>'.
// //       '<span style="background-color: #ffbf00;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($secPlotBands, 1, '.', '').' - '.number_format($firstPlotBands, 1, '.', '').'</span><br>'.
// //           '<span style="background-color: #DF5353;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //               '0 - '.number_format($secPlotBands, 1, '.', '').'</span><br><br/>';


// //     $chart -> subtitle -> text = $subtitleText;
// //     if ($net_generation >= $firstPlotBands) {
// //         $color = '#55BF3B';
// //     } elseif($net_generation < $firstPlotBands && $net_generation >= $secPlotBands){
// //         $color = '#ffbf00';
// //     }else {
// //         $color = '#DF5353';
// //     }

// //     $chart -> subtitle -> useHTML= true;
// //     $chart -> subtitle -> verticalAlign='top';
// //     $chart -> subtitle -> x=10;
// //     $chart -> subtitle -> y=50;
// //     $chart -> subtitle -> align='left';
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#55BF3B', "from"=> $firstPlotBands, "to"=> max($max, $net_generation, $forecast_generation));
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#ffbf00', "from"=> $secPlotBands, "to"=> $firstPlotBands);
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#DF5353', "from"=> 0.0, "to"=> $secPlotBands);
// // }
// // if ($checkQtr) {
// //     $dataArray = ['1budget' => $max, "2qtd" => $actualBudgetVal, '3actual' => $net_generation, '4forecast' => $forecast_generation];
// // } else {
// //     $dataArray = ['1budget' => $max, '3actual' => $net_generation, '4forecast' => $forecast_generation];
// // }

// // $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, $checkQtr);

// // $chart -> series[]=array("name"=> 'Budget',
// //     "showInLegend"=> true,
// //     "color"=> '#000000',
// //     "data"=> array(array("y"=>(float)$max, "color"=> '#000000')),
// //     "dial"=> array("backgroundColor"=> '#000000', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['1budget']),
// //     "dataLabels"=> array("enabled"=> false)
// // );

// // if ($checkQtr) {
// //     $chart -> series[]=array("name"=> 'QTD Budget',
// //         "showInLegend"=> true,
// //         "color"=> '#808080',
// //         "data"=> array(array("y"=>(float)$actualBudgetVal, "color"=> '#808080')),
// //         "dial"=> array("backgroundColor"=> '#808080', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['2qtd']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => 'MU '
// //         ));
// // }

// // $chart -> series[]=array("name"=> 'Actual',
// //     "showInLegend"=> true,
// //     "color"=> '#4141FF',
// //     "data"=> array(array("y"=>(float)$net_generation, "color"=> '#4141FF')),
// //     "dial"=> array("backgroundColor"=> '#4141FF', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['3actual']),
// //     "dataLabels" => array(
// //         'formatter' => new HighchartJsExpr("function () {
// //                                return '<span style=\"color:" . $color . "\">".$net_generation." MU</span><br/>'; }"
// //                            )),
// // 'tooltip' => array(
// //     'valueSuffix' => 'MU '
// // ));

// // $Date1 = date('Y-m-d');
// // $Date2 = date('Y-m-d', strtotime($Date1. " - 1 day"));

// // $date1 = strtotime($Date2);
// // $date2 = strtotime($date);
// // $diff = $date2 - $date1;

// // if ($diff >= 0) {
// //     $chart -> series[]=array("name"=> 'Forecast',
// //         "showInLegend"=> true,
// //         "color"=> '#FFC200',
// //         "data"=> array(array("y"=>(float)$forecast_generation, "color"=> '#FFC200')),
// //         "dial"=> array("backgroundColor"=> '#FFC200', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['4forecast']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => 'MU '
// //         ));
// // }





// // $chart -> exporting -> buttons -> customButton -> x=-17;
// // $chart -> exporting -> buttons -> customButton -> y=-17;
// // $chart -> exporting -> buttons -> customButton -> align='right';
// // $chart -> exporting -> buttons -> customButton -> verticalAlign='top';
// // $chart -> exporting -> buttons -> customButton -> onclick=new HighchartJsExpr(
// //     "function() {
// //                       window.open('/report/DeviateExcelExportEXT/QTD/".$ext."', '_blank');}");
// // $chart -> exporting -> buttons -> customButton -> text= 'Dev <br/>Report';

// // $chart -> exporting -> buttons -> customButton2 -> x=-74;
// // $chart -> exporting -> buttons -> customButton2 -> y=-7;
// // $chart -> exporting -> buttons -> customButton2 -> align='right';
// // $chart -> exporting -> buttons -> customButton2 -> verticalAlign='top';
// // $chart -> exporting -> buttons -> customButton2 -> onclick=new HighchartJsExpr(
// //     "function() {
// //                        javascript: comparePopUP('" . base64_encode($graphId) . "', '" . $canvasId . "', '" . site_url('highchartgraph / compareGCGraph') . "', '" . site_url('images / bx_loader.gif') . "')}");
// //                       $chart -> exporting -> buttons -> customButton2 -> text= 'Compare';


// // echo $chart -> render("chart1");
// // foreach($mnArray as $k=> $v)
// // {
// //     if (isset($budgetArr[$v])) {
// //         $maxpt = number_format(($budgetArr[$v] / 1000000), 3, '.', '');
// //         $threePFivept = ($budgetArr[$v] - ($budgetArr[$v] * 0.035));
// //         $nxtthreePFivept = ($threePFivept - ($threePFivept * 0.035));
// //         $firstPlotBandspt = number_format(($threePFivept / 1000000), 3, '.', '');
// //         $secPlotBandspt = number_format(($nxtthreePFivept / 1000000), 3, '.', '');
// //     }
// //     else {
// //         $maxpt = 0.0;
// //         $threePFivept = 0.0;
// //         $nxtthreePFivept = 0.0;
// //         $firstPlotBandspt = 0.0;
// //         $secPlotBandspt = 0.0;
// //     }
// //     if (isset($netArr[$v])) {
// //         $net_generationpt = number_format(((float) $netArr[$v] / 1000000), 2, '.', '');
// //     }
// //     else {
// //         $net_generationpt = 0;
// //     }
// //     if (isset($forecastArr[$v])) {
// //         $forecast_generationpt = number_format(((float) $forecastArr[$v] / 1000000), 2, '.', '');
// //     }
// //     else {
// //         $forecast_generationpt = 0;
// //     }
// //     $chart2 = new Highchart();
// //     $chart2 -> includeExtraScripts();
// //     $chart2 -> chart = array(
// //         'renderTo'=> "canvas".++$k.$canvasId,
// //         'type' => 'gauge',
// //         'spacingTop' => 0,
// //         'spacingBottom' => 30,
// //         'width' => 200,
// //         'height' => 325
// //     );
// //     $chmonth = $v + 1;
// //     $chart2 -> title -> text= date('F', mktime(0, 0, 0, $chmonth, 0, 0));
// //     $chart2 -> title -> style = array('color'=> '#666', 'fontWeight'=> 'normal', 'width'=> '150px', 'fontSize'=> 13);
// //     $chart2 -> title -> margin = 10;
// //     $chart2 -> title -> align = 'center';
// //     $chart2 -> legend -> allowDecimals=false;
// //     $chart2 -> legend -> itemWidth=150;
// //     $chart2 -> legend -> itemStyle=array("cursor"=> 'default', "color"=> 'black');
// //     $chart2 -> legend -> align='bottom';
// //     $chart2 -> legend -> verticalAlign='top';
// //     $chart2 -> legend -> layout='vertical';
// //     $chart2 -> legend -> x=0;
// //     $chart2 -> legend -> y=220;
// //     $chart2 -> legend -> useHTML=true;
// //     $chart2 -> legend -> floating=true;
// //     $chart2 -> legend -> borderRadius=0;
// //     $chart2 -> legend -> borderWidth=0;
// //     $chart2 -> legend -> labelFormatter = new HighchartJsExpr("function () {
// //           return '<span style=\"font-size:9px; border-radius: 2px; padding: 1px 2px;\">' + this.yData + ' MU ' + this.name + '</span>';
// // } "
// //       );

// // $chart2 -> pane -> startAngle = -150;
// // $chart2 -> pane -> endAngle = 150;
// // $chart2 -> pane -> center =[90, 110];
// // $chart2 -> background = array(
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#FFF'),
// //                 array(1, '#333')
// //             )
// //         ),
// //         'borderWidth' => 0,
// //         'outerRadius' => '109%'
// //     ),
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#333'),
// //                 array(1, '#FFF')
// //             )
// //         ),
// //         'borderWidth' => 1,
// //         'outerRadius' => '107%'
// //     ),
// //     array(),
// //     array(
// //         'backgroundColor' => '#DDD',
// //         'borderWidth' => 0,
// //         'outerRadius' => '105%',
// //         'innerRadius' => '103%'
// //     )
// // );

// // $chart2 -> yAxis -> min=0;
// // $chart2 -> yAxis -> minorTickInterval= 'auto';
// // $chart2 -> yAxis -> minorTickWidth= 1;
// // $chart2 -> yAxis -> minorTickLength= 10;
// // $chart2 -> yAxis -> minorTickPosition= 'inside';
// // $chart2 -> yAxis -> minorTickColor= '#666';
// // $chart2 -> yAxis -> tickPixelInterval= 30;
// // $chart2 -> yAxis -> tickWidth= 2;
// // $chart2 -> yAxis -> tickPosition= 'inside';
// // $chart2 -> yAxis -> tickLength= 10;
// // $chart2 -> yAxis -> tickColor= '#666';
// // $chart2 -> yAxis -> labels= array("step"=> 3, "rotation"=> "auto");
// // $chart2 -> yAxis -> title -> text="Generation (Kwh)";
// // $chart2 -> yAxis -> title -> y=20;
// // $chart2 -> yAxis -> title -> style = array('color'=> 'blue', 'width'=> 30, 'fontWeight'=> 'normal', 'fontSize'=> '8px');


// // if ($max != 0 || $max != NULL) {
// //     $chart2 -> yAxis -> max=max($maxpt, $net_generationpt, $forecast_generationpt);
// //     $chart2 -> subtitle -> text= '<span style="background-color: #55BF3B;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($firstPlotBandspt, 1, '.', '').' - '.number_format($maxpt, 1, '.', '').'</span>'.
// //         '<span style="background-color: #ffbf00;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($secPlotBandspt, 1, '.', '').' - '.number_format($firstPlotBandspt, 1, '.', '').'</span>'.
// //             '<span style="background-color: #DF5353;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //                 '0 - '.number_format($secPlotBandspt, 1, '.', '').'</span><br>';

// //     if ($net_generationpt >= $firstPlotBandspt) {
// //         $colorPt = '#55BF3B';
// //     } elseif($net_generationpt < $firstPlotBandspt && $net_generationpt >= $secPlotBandspt){
// //         $colorPt = '#ffbf00';
// //     }else {
// //         $colorPt = '#DF5353';
// //     }


// //     $chart2 -> subtitle -> useHTML= true;
// //     $chart2 -> subtitle -> verticalAlign='top';
// //     $chart2 -> subtitle -> x=-5;
// //     $chart2 -> subtitle -> y=40;
// //     $chart2 -> subtitle -> textOverflow = "none";
// //     $chart2 -> subtitle -> whiteSpace= 'nowrap';
// //     $chart2 -> yAxis -> plotBands[]=array("color"=> '#55BF3B', "from"=> $firstPlotBandspt, "to"=> max($maxpt, $net_generationpt, $forecast_generationpt));
// //     $chart2 -> yAxis -> plotBands[]=array("color"=> '#ffbf00', "from"=> $secPlotBandspt, "to"=> $firstPlotBandspt);
// //     $chart2 -> yAxis -> plotBands[]=array("color"=> '#DF5353', "from"=> 0.0, "to"=> $secPlotBandspt);
// // }

// // if ($curMonth == $v) {
// //     $dataArray = ['1budget' => $maxpt, "2qtd" => $actualBudgetVal, '3actual' => $net_generationpt, '4forecast' => $forecast_generationpt];
// //     $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, true);
// // } else {
// //     $dataArray = ['1budget' => $maxpt, '3actual' => $net_generationpt, '4forecast' => $forecast_generationpt];
// //     $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, false);
// // }

// // $chart2 -> series[]=array("name"=> 'Budget',
// //     "showInLegend"=> true,
// //     "color"=> '#000000',
// //     "data"=> array(array("y"=>(float)$maxpt, "color"=> '#000000')),
// //     "dial"=> array("backgroundColor"=> '#000000', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['1budget']),
// //     "dataLabels"=> array("enabled"=> false)
// // );
// // if ($curMonth == $v) {
// //     $nameStartDate = $curYear. "-".$curMonth. "-01";
// //     if ($checkQtr) {
// //         $actualBudgetVal = $this -> hgm -> getYrBudgetGen($nameStartDate, $date, $plantIds);
// //         $actualBudgetVal = number_format(($actualBudgetVal / 1000000), 2, '.', '');
// //     }
// //     $chart2 -> series[]=array("name"=> 'MTD Budget',
// //         "showInLegend"=> true,
// //         "color"=> '#808080',
// //         "data"=> array(array("y"=>(float)$actualBudgetVal, "color"=> '#808080')),
// //         "dial"=> array("backgroundColor"=> '#808080', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['2qtd']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => 'MU '
// //         ));
// // }

// // $chart2 -> series[]=array("name"=> 'Actual',
// //     "showInLegend"=> true,
// //     "color"=> '#4141FF',
// //     "data"=> array(array("y"=>(float)$net_generationpt, "color"=> '#4141FF')),
// //     "dial"=> array("backgroundColor"=> '#4141FF', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['3actual']),
// //     "dataLabels" => array(
// //         'formatter' => new HighchartJsExpr("function () {
// //                                  return '<span style=\"color:" . $colorPt . "\">".$net_generationpt." MU</span><br/>'; }"
// //                              )),
// // 'tooltip' => array(
// //     'valueSuffix' => 'MU '
// // ));

// // $chkYear = date('Y', strtotime($date));
// // $chkMonth = $chmonth - 1;
// // $chkDate = date($chkYear.'-'.$chkMonth.'-1');

// // $curDate2 = date('Y-m-1');

// // $date1 = strtotime($curDate2);
// // $date2 = strtotime($chkDate);
// // $diff = $date2 - $date1;

// // if ($diff >= 0) {
// //     $chart2 -> series[]=array("name"=> 'Forecast',
// //         "showInLegend"=> true,
// //         "color"=> '#FFC200',
// //         "data"=> array(array("y"=>(float)$forecast_generationpt, "color"=> '#FFC200')),
// //         "dial"=> array("backgroundColor"=> '#FFC200', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['4forecast']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => 'MU '
// //         ));
// // }
// // echo $chart2 -> render("chart1");
// //   }

// //   }
// // /**
// //  * [makeGraphrevfgauge description]
// //  * @return [type] [description]
// //  */
// // public function makeGraphrevfgauge() {
// //     $graphId = base64_decode($this -> input -> post('graph'));
// //     $canvasId = $this -> input -> post('canvas');
// //     $plantIds = $this -> input -> post('plantIds');
// //     $plantIdsStr = implode(",", $plantIds);
// //     $graphData = $this -> st -> getGraphByGraphId($graphId);
// //     $graphData = $graphData[0];
// //     $date = $this -> hgm -> getEnday($graphData);
// //     $curMonth = date("m", strtotime($date));
// //     $curYear = date("Y", strtotime($date));
// //     $mnthCheck = array("01", "04", "07", "10");
// //     $getQuarter = ceil($curMonth / 3);
// //     $interval = $graphData -> time_interval;
// //     $arrCntQtr = array(1=> 4, 2=> 1, 3=> 2, 4=> 3);
// //     $checkQtr = false;
// //     if (in_array($curMonth, $mnthCheck)) {
// //         $sqlJoin = FALSE;
// //     }
// //     else {
// //         $sqlJoin = TRUE;
// //     }

// //     if ($interval == 1) {
// //         $mnArray = array(4, 5, 6);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-04-01', strtotime("-1 year"));
// //             $date = date('Y-06-30', strtotime("-1 year"));
// //             $bdate = date('Y-06-30', strtotime("-1 year"));
// //             $ext = date('Y', strtotime("-1 year")).'-2';
// //         }
// //         else if ($getQuarter == 3 || $getQuarter == 4) {
// //             $from = date('Y-04-01');
// //             $date = date('Y-06-30');
// //             $bdate = date('Y-06-30');
// //             $ext = date('Y').'-2';
// //         }
// //         else {
// //             $from = date('Y-04-01');
// //             $bdate = date('Y-06-30');
// //             $ext = date('Y').'-2';
// //         }
// //     }
// //     if ($interval == 2) {
// //         $mnArray = array(7, 8, 9);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-07-01', strtotime("-1 year"));
// //             $date = date('Y-09-30', strtotime("-1 year"));
// //             $bdate = date('Y-09-30', strtotime("-1 year"));
// //             $ext = date('Y', strtotime("-1 year")).'-3';
// //         }
// //         else if ($getQuarter == 2 || $getQuarter == 4) {
// //             $from = date('Y-07-01');
// //             $date = date('Y-09-30');
// //             $bdate = date('Y-09-30');
// //             $ext = date('Y').'-3';
// //         }
// //         else {
// //             $from = date('Y-07-01');
// //             $bdate = date('Y-09-30');
// //             $ext = date('Y').'-3';
// //         }
// //     }
// //     if ($interval == 3) {
// //         $mnArray = array(10, 11, 12);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-10-01', strtotime("-1 year"));
// //             $date = date('Y-12-31', strtotime("-1 year"));
// //             $bdate = date('Y-12-31', strtotime("-1 year"));
// //             $ext = date('Y', strtotime("-1 year")).'-4';
// //         }
// //         else if ($getQuarter == 2 || $getQuarter == 3) {
// //             $from = date('Y-10-01');
// //             $date = date('Y-12-31');
// //             $bdate = date('Y-12-31');
// //             $ext = date('Y').'-4';
// //         }
// //         else {
// //             $from = date('Y-10-01');
// //             $bdate = date('Y-12-31');
// //             $ext = date('Y').'-4';
// //         }
// //     }
// //     if ($interval == 4) {
// //         $mnArray = array(1, 2, 3);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-01-01');
// //             $bdate = date('Y-03-31');
// //             $ext = date('Y').'-1';
// //         }
// //         else {
// //             $from = date('Y-01-01', strtotime("+1 year"));
// //             $date = date('Y-03-31', strtotime("+1 year"));
// //             $bdate = date('Y-03-31', strtotime("+1 year"));
// //             $ext = date('Y', strtotime("+1 year")).'-1';
// //         }

// //     }
// //     //// Tmperorary
// //     if ($interval == $arrCntQtr[$getQuarter]) {
// //         $cndn = 0;
// //     }
// //     else if ($interval > $arrCntQtr[$getQuarter]) {
// //         $cndn = 1;
// //     }
// //     else if ($interval < $arrCntQtr[$getQuarter]) {
// //         $cndn = -1;
// //     }

// //     $time = $graphData -> time_period;
// //     $unit = $graphData -> time_group;
// //     $y1_text = $graphData -> y1_title." (".$graphData -> y1_unit.")";
// //     $colorArr = explode(',', $graphData -> color_code);
// //     $labelArr = explode(',', $graphData -> label);
// //     $deviceArr = explode('!@#', $graphData -> device);
// //     $deviceTextArr = explode('!@#', $graphData -> device_text);
// //     $channelArr = explode(',', $graphData -> channel);
// //     $aggregateArr = explode(',', $graphData -> aggregation);
// //     $colorArr = explode(',', $graphData -> color_code);

// //     if ($graphData -> plant != NULL) {
// //         $plantArr = explode(',', $graphData -> plant);
// //     } else {
// //         $plantArr = array();
// //     }
// //     $queryArray = array();

// //     for ($i = 0; $i < count($labelArr); $i++) {

// //         if ($labelArr[$i] == 'Forecast') {
// //             if ($deviceArr[$i] == "forecast_generation_revenue") {

// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "forecast_generation_revenue") {
// //                     $select = 'forecast_generation';
// //                 }
// //                 $column = 'Forecast';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'month') {
// //                         if ($time == 'quarterly') {

// //                             $query = '';
// //                             $query = " SELECT '".$column."' as individual_name".$i.",".$aggregate."(ld.generation*p.tariff) as data".$i.",ld.year as year".$i.",ld.month as month".$i." FROM plant AS p INNER JOIN lender_detail AS ld ON p.plant_id=ld.plant_id WHERE ld.type='Budget' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$bdate."' AND p.plant_id !=22 AND p.plant_id !=5  AND p.plant_id IN( ".$plantIdsStr.") GROUP BY ld.year,ld.month ";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." ,  t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                             $queryArray[$i] = $query;
// //                         }
// //                     }
// //                 }
// //             }
// //             else if ($deviceArr[$i] == "net_generation_revenue") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "net_generation_revenue") {

// //                     $select = '(pg.actual_generation - pg.import)*p.tariff';
// //                 }
// //                 $column = 'Actual';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'month') {
// //                         $newDate = date('Y-m-t', strtotime($date." first day of last month"));
// //                         $currMFday = date('Y-m-01', strtotime($date));
// //                         $lastMFday = date('Y-m-01', strtotime($date."first day of last month"));
// //                         $query = '';
// //                         if ($time == 'quarterly') {
// //                             if ($interval != $arrCntQtr[$getQuarter]) {
// //                                 $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE pg.date BETWEEN '".$from."' AND '".$date."' AND data_flag = 2 AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") GROUP BY YEAR(pg.date),MONTH(pg.date)";
// //                                 $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;

// //                             }
// //                             else {
// //                                 if ($sqlJoin) {
// //                                     $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE pg.date BETWEEN '".$from."' AND '".$newDate."' AND data_flag = 2 AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") GROUP BY YEAR(pg.date),MONTH(pg.date)";
// //                                     $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
// //                                     LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
// //                                     LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52 AND p.plant_id IN(".$plantIdsStr .") GROUP BY YEAR(pg.date), MONTH(pg.date)";
// //                                     $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                                 }
// //                                 else {
// //                                     $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
// //                                     LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
// //                                     LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52 AND p.plant_id IN(".$plantIdsStr .") GROUP BY YEAR(pg.date), MONTH(pg.date)";
// //                                     $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                                 }
// //                             }
// //                         }
// //                     }
// //                     $queryArray[$i] = $query;
// //                 }
// //             }
// //             else if ($deviceArr[$i] == "generation_budget_revenue") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "generation_budget_revenue") {
// //                     $select = 'budget_generation';
// //                 }
// //                 $column = 'Budget';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'month') {

// //                         if ($time == 'quarterly') {
// //                             $query = '';
// //                             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select."*p.tariff) as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM extended_budget f INNER JOIN plant p ON p.plant_id = f.plant_id WHERE STR_TO_DATE( CONCAT( f.year,  '-', f.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$bdate."' AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") GROUP BY f.year,f.month";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i.",t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                             $queryArray[$i] = $query;
// //                         }
// //                     }
// //                 }
// //             }
// //         }


// //     }

// //     $doller = $this -> hgm -> getDollerVal($interval, $checkQtr);
// //     if ($interval == 1) {
// //         $doller = 68.92;
// //     }
// //     $BudVal = 0;
// //     $preBudVal = 0;
// //     $netVal = 0;
// //     $forecastVal = 0;
// //     $net_generation = 0;
// //     $forecast_generation = 0;
// //     $budgetArr = array();
// //     $netArr = array();
// //     $forecastArr = array();

// //     for ($i = 0; $i < count($queryArray); $i++) {
// //         $responseArrayTotal = $this -> um -> runGivenQuery($queryArray[$i]);
// //         if (!empty($responseArrayTotal)) {
// //             $j = 0;
// //             foreach($responseArrayTotal as $responseArray)
// //             {
// //                 if ($responseArray -> { "individual_name".$i } == "Budget") {
// //                     $BudVal += ((float) $responseArray -> { "data".$i } / $doller);
// //                     $preBudVal += ((float) $responseArray -> { "data".$i } / BUDGETED_DOLLAR_VALUE);
// //                     $budgetArr[$responseArray -> { "month".$i }] = ((float) $responseArray -> { "data".$i } / $doller);
// //                     $preBudgetArr[$responseArray -> { "month".$i }] = ((float) $responseArray -> { "data".$i } / BUDGETED_DOLLAR_VALUE);
// //                 }
// //                 if ($responseArray -> { "individual_name".$i } == "Actual") {
// //                     $netVal += ((float) $responseArray -> { "data".$i } / $doller);
// //                     $netArr[$responseArray -> { "month".$i }] = ((float) $responseArray -> { "data".$i } / $doller);
// //                     if ($cndn == -1) {
// //                         if (in_array($j, array(0, 1))) {
// //                             $forecastVal += ((float) $responseArray -> { "data".$i } / $doller);
// //                         }
// //                     }
// //                     else if ($cndn == 0) {
// //                         if ($curMonth > (integer) $responseArray -> { "month".$i })
// //                         {
// //                             $forecastVal += ((float) $responseArray -> { "data".$i } / $doller);
// //                         }
// //                     }

// //                 }
// //                 if ($responseArray -> { "individual_name".$i } == "Forecast") {
// //                     if ($cndn == 1) {
// //                         $forecastVal += ((float) $responseArray -> { "data".$i } / $doller);
// //                     }
// //                     else if ($cndn == 0) {
// //                         if ($curMonth <= (integer) $responseArray -> { "month".$i })
// //                         {
// //                             $forecastVal += ((float) $responseArray -> { "data".$i } / $doller);
// //                         }
// //                     }
// //                     else if ($cndn == -1) {
// //                         if (in_array($j, array(2))) {
// //                             $forecastVal += ((float) $responseArray -> { "data".$i } / $doller);
// //                         }
// //                     }
// //                     $forecastArr[$responseArray -> { "month".$i }] = ((float) $responseArray -> { "data".$i } / $doller);

// //                 }
// //                 $j++;
// //             }
// //         }
// //     }

// //     $max = number_format(($BudVal / 1000000), 3, '.', '');
// //     $preBudValPrev = $preBudVal;
// //     $preBudVal = number_format(($preBudVal / 1000000), 3, '.', '');
// //     $threePFive = ($preBudValPrev - ($preBudValPrev * 0.035));
// //     $nxtthreePFive = ($threePFive - ($threePFive * 0.035));
// //     $firstPlotBands = number_format(($threePFive / 1000000), 3, '.', '');
// //     $secPlotBands = number_format(($nxtthreePFive / 1000000), 3, '.', '');
// //     $net_generation = number_format(((float) $netVal / 1000000), 2, '.', '');
// //     $forecast_generation = number_format(((float) $forecastVal / 1000000), 2, '.', '');

// //     $forexLoss = abs($max - $preBudVal);
// //     $colsedGName = "Current";
// //     if ($checkQtr) {
// //         $colsedGName = "Current";
// //         $actualBudgetVal = $this -> hgm -> getYrBudgetRev($from, $date, $plantIds);
// //         $actualBudgetVal = ((float) $actualBudgetVal / BUDGETED_DOLLAR_VALUE);
// //         $actualBudgetVal = number_format(($actualBudgetVal / 1000000), 2, '.', '');
// //     }
// //     if ($interval == 1) {
// //         $colsedGName = "Closed";
// //     }
// //     $chart = new Ghunti\HighchartsPHP\Highchart();
// //     $chart -> includeExtraScripts();
// //     $chart -> chart = array(
// //         'renderTo'=> "canvas".$canvasId,
// //         'type' => 'gauge',
// //         'spacingTop' => 10,
// //         'spacingLeft' => 15,
// //         'height' => 245
// //     );
// //     $chart -> title -> text= 'Date from: '.date('d/m/Y', strtotime($from)). ' to: '.date('d/m/Y', strtotime($date));
// //     $chart -> title -> style = array('color'=> '#666', 'font'=> 'normal 14px', 'fontSize'=> 13);
// //     $chart -> title -> margin = 10;
// //     $chart -> title -> align = 'center';
// //     $chart -> legend -> allowDecimals=false;
// //     $chart -> legend -> itemWidth=150;
// //     $chart -> legend -> itemStyle=array("cursor"=> 'default', "color"=> 'black', "font" => "9pt Trebuchet MS, Verdana, sans-serif", "fontWeight"=> '600');
// //     $chart -> legend -> verticalAlign='top';
// //     $chart -> legend -> layout='vertical';
// //     $chart -> legend -> y=30;
// //     $chart -> legend -> x=405;
// //     $chart -> legend -> align='left';
// //     $chart -> legend -> useHTML=true;
// //     $chart -> legend -> floating=true;
// //     $chart -> legend -> borderRadius=0;
// //     $chart -> legend -> borderWidth=0;
// //     $chart -> legend -> labelFormatter = new HighchartJsExpr("function () {
// //                   return this.yData + ' ' + this.name;
// // } "
// //               );

// // $chart -> pane -> startAngle = -150;
// // $chart -> pane -> endAngle = 150;
// // $chart -> background = array(
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#FFF'),
// //                 array(1, '#333')
// //             )
// //         ),
// //         'borderWidth' => 0,
// //         'outerRadius' => '109%'
// //     ),
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#333'),
// //                 array(1, '#FFF')
// //             )
// //         ),
// //         'borderWidth' => 1,
// //         'outerRadius' => '107%'
// //     ),
// //     array(),
// //     array(
// //         'backgroundColor' => '#DDD',
// //         'borderWidth' => 0,
// //         'outerRadius' => '105%',
// //         'innerRadius' => '103%'
// //     )
// // );

// // $chart -> yAxis -> min=0;
// // $chart -> yAxis -> minorTickInterval= 'auto';
// // $chart -> yAxis -> minorTickWidth= 1;
// // $chart -> yAxis -> minorTickLength= 10;
// // $chart -> yAxis -> minorTickPosition= 'inside';
// // $chart -> yAxis -> minorTickColor= '#666';
// // $chart -> yAxis -> tickPixelInterval= 30;
// // $chart -> yAxis -> tickWidth= 2;
// // $chart -> yAxis -> tickPosition= 'inside';
// // $chart -> yAxis -> tickLength= 10;
// // $chart -> yAxis -> tickColor= '#666';
// // $chart -> yAxis -> labels= array("step"=> 3, "rotation"=> "auto");
// // $chart -> yAxis -> title -> text="Revenue (USD)";
// // $chart -> yAxis -> title -> y=20;
// // $chart -> yAxis -> title -> style = array('color'=> 'blue', 'width'=> 30, 'fontWeight'=> 'normal', 'fontSize'=> '8px');

// // if ($max != 0 || $max != NULL) {
// //     $subtitleText = '<span style="background-color: #55BF3B;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($firstPlotBands, 1, '.', '').' - '.number_format($max, 1, '.', '').'</span><br>'.
// //                   '<span style="background-color: #ffbf00;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($secPlotBands, 1, '.', '').' - '.number_format($firstPlotBands, 1, '.', '').'</span><br>'.
// //                       '<span style="background-color: #DF5353;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //                           '0 - '.number_format($secPlotBands, 1, '.', '').'</span><br><br><span style="color:#000000;font-size:10px; border-radius: 2px; padding: 1px 2px;">1(USD)$='.number_format($doller, 2, '.', ''). ' (INR) <span style="font-family:Arial;">&#8377; ('.$colsedGName.')</span></span><br><span style="color:#000000;font-size:10px; border-radius: 2px; padding: 1px 2px;">1(USD)$='.number_format(BUDGETED_DOLLAR_VALUE, 2, '.', ''). ' (INR) <span style="font-family:Arial;">&#8377; (Budgeted)</span></span><br>';
// //     $subtitleText.= '<br><span style="color:#000000;font-weight:bold;font-size:11px;border-radius: 2px; padding: 1px 2px;">'.number_format($max, 2, '.', '').' '.$colsedGName.' Budget</span>';
// //     $subtitleText.= '<br><span style="color:#000000;font-weight:bold;font-size:11px;border-radius: 2px; padding: 1px 2px;">'.number_format($forexLoss, 2, '.', '').' Forex Loss</span><br>';

// //     $chart -> subtitle -> text = $subtitleText;
// //     if ($net_generation >= $firstPlotBands) {
// //         $color = '#55BF3B';
// //     } elseif($net_generation < $firstPlotBands && $net_generation >= $secPlotBands){
// //         $color = '#ffbf00';
// //     }else {
// //         $color = '#DF5353';
// //     }

// //     $chart -> subtitle -> useHTML= true;
// //     $chart -> subtitle -> verticalAlign='top';
// //     $chart -> subtitle -> x=10;
// //     $chart -> subtitle -> y=50;
// //     $chart -> subtitle -> align='left';

// //     $chart -> yAxis -> max=max($max, $net_generation, $forecast_generation, $preBudVal);
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#55BF3B', "from"=> $firstPlotBands, "to"=> max($max, $net_generation, $forecast_generation, $preBudVal));
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#ffbf00', "from"=> $secPlotBands, "to"=> $firstPlotBands);
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#DF5353', "from"=> 0.0, "to"=> $secPlotBands);
// // }

// // if ($checkQtr) {
// //     $dataArray = ['1budget' => $preBudVal, "2qtd" => $actualBudgetVal, '3actual' => $net_generation, '4forecast' => $forecast_generation];
// // } else {
// //     $dataArray = ['1budget' => $preBudVal, '3actual' => $net_generation, '4forecast' => $forecast_generation];
// // }

// // $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, $checkQtr);

// // $chart -> series[]=array("name"=> 'Budget',
// //     "showInLegend"=> true,
// //     "color"=> '#000000',
// //     "data"=> array(array("y"=>(float)$preBudVal, "color"=> '#000000')),
// //     "dial"=> array("backgroundColor"=> '#000000', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['1budget']),
// //     "dataLabels" => array("enabled"=> false),
// //     'tooltip' => array(
// //         'valueSuffix' => ''
// //     ));

// // if ($checkQtr) {
// //     $chart -> series[]=array("name"=> 'QTD Budget',
// //         "showInLegend"=> true,
// //         "color"=> '#808080',
// //         "data"=> array(array("y"=>(float)$actualBudgetVal, "color"=> '#808080')),
// //         "dial"=> array("backgroundColor"=> '#808080', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['2qtd']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => ''
// //         ));
// // }

// // $chart -> series[]=array("name"=> 'Actual',
// //     "showInLegend"=> true,
// //     "color"=> '#4141FF',
// //     "data"=> array(array("y"=>(float)$net_generation, "color"=> '#4141FF')),
// //     "dial"=> array("backgroundColor"=> '#4141FF', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['3actual']),
// //     "dataLabels" => array(
// //         'formatter' => new HighchartJsExpr("function () {
// //                                          return '<span style=\"color: " . $color . "\">".$net_generation." Mn</span><br/>'; }"
// //                                      )),
// // 'tooltip' => array(
// //     'valueSuffix' => ''
// // ));

// // $Date1 = date('Y-m-d');
// // $Date2 = date('Y-m-d', strtotime($Date1. " - 1 day"));

// // $date1 = strtotime($Date2);
// // $date2 = strtotime($date);
// // $diff = $date2 - $date1;

// // if ($diff >= 0) {

// //     $chart -> series[]=array("name"=> 'Forecast',
// //         "showInLegend"=> true,
// //         "color"=> '#FFC200',
// //         "data"=> array(array("y"=>(float)$forecast_generation, "color"=> '#FFC200')),
// //         "dial"=> array("backgroundColor"=> '#FFC200', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['4forecast']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => ''
// //         ));
// // }

// // $chart -> exporting -> buttons -> customButton -> x=-17;
// // $chart -> exporting -> buttons -> customButton -> y=-17;
// // $chart -> exporting -> buttons -> customButton -> align='right';
// // $chart -> exporting -> buttons -> customButton -> verticalAlign='top';
// // $chart -> exporting -> buttons -> customButton -> onclick=new HighchartJsExpr(
// //     "function() {
// //                                 window.open('/report/DeviateExcelExportEXT/QTD/".$ext."', '_blank');}");
// // $chart -> exporting -> buttons -> customButton -> text= 'Dev <br/>Report';

// // $chart -> exporting -> buttons -> customButton2 -> x=-74;
// // $chart -> exporting -> buttons -> customButton2 -> y=-7;
// // $chart -> exporting -> buttons -> customButton2 -> align='right';
// // $chart -> exporting -> buttons -> customButton2 -> verticalAlign='top';
// // $chart -> exporting -> buttons -> customButton2 -> onclick=new HighchartJsExpr(
// //     "function() {
// //                                  javascript: comparePopUP('" . base64_encode($graphId) . "', '" . $canvasId . "', '" . site_url('highchartgraph / compareRCGraph') . "', '" . site_url('images / bx_loader.gif') . "')}");
// //                                 $chart -> exporting -> buttons -> customButton2 -> text= 'Compare';

// // echo $chart -> render("chart1");
// // foreach($mnArray as $k=> $v)
// // {
// //     if (isset($budgetArr[$v])) {
// //         $maxpt = number_format(($budgetArr[$v] / 1000000), 3, '.', '');
// //         $preMaxpt = number_format(($preBudgetArr[$v] / 1000000), 2, '.', '');
// //         $threePFivept = ($preBudgetArr[$v] - ($preBudgetArr[$v] * 0.035));
// //         $nxtthreePFivept = ($threePFivept - ($threePFivept * 0.035));
// //         $firstPlotBandspt = number_format(($threePFivept / 1000000), 3, '.', '');
// //         $secPlotBandspt = number_format(($nxtthreePFivept / 1000000), 3, '.', '');
// //         $forexLoss = abs($maxpt - $preMaxpt);
// //     }
// //     else {
// //         $maxpt = 0.0;
// //         $preMaxpt = 0.0;
// //         $threePFivept = 0.0;
// //         $nxtthreePFivept = 0.0;
// //         $firstPlotBandspt = 0.0;
// //         $secPlotBandspt = 0.0;
// //     }
// //     if (isset($netArr[$v])) {
// //         $net_generationpt = number_format(((float) $netArr[$v] / 1000000), 2, '.', '');
// //     }
// //     else {
// //         $net_generationpt = 0;
// //     }
// //     if (isset($forecastArr[$v])) {
// //         $forecast_generationpt = number_format(((float) $forecastArr[$v] / 1000000), 2, '.', '');
// //     }
// //     else {
// //         $forecast_generationpt = 0;
// //     }
// //     $chart2 = new Highchart();
// //     $chart2 -> includeExtraScripts();
// //     $chart2 -> chart = array(
// //         'renderTo'=> "canvas".++$k.$canvasId,
// //         'type' => 'gauge',
// //         'spacingTop' => 10,
// //         //'spacingLeft' => 0,
// //         'width' => 200,
// //         'height' => 350
// //     );
// //     $chmonth = $v + 1;
// //     $chart2 -> title -> text= date('F', mktime(0, 0, 0, $chmonth, 0, 0));
// //     $chart2 -> title -> style = array('color'=> '#666', 'fontWeight'=> 'normal', 'width'=> '150px', 'fontSize'=> 13);
// //     $chart2 -> title -> margin = 10;
// //     $chart2 -> title -> align = 'center';

// //     $chart2 -> legend -> allowDecimals=false;
// //     $chart2 -> legend -> itemWidth=150;
// //     $chart2 -> legend -> itemStyle=array("cursor"=> 'default', "color"=> 'black');
// //     $chart2 -> legend -> align='bottom';
// //     $chart2 -> legend -> verticalAlign='top';
// //     $chart2 -> legend -> layout='vertical';
// //     $chart2 -> legend -> x=0;
// //     $chart2 -> legend -> y=270;
// //     $chart2 -> legend -> useHTML=true;
// //     $chart2 -> legend -> floating=true;
// //     $chart2 -> legend -> borderRadius=0;
// //     $chart2 -> legend -> borderWidth=0;
// //     $chart2 -> legend -> labelFormatter = new HighchartJsExpr("function () {
// //                     return '<span style=\"font-size:9px; border-radius: 2px; padding: 1px 2px;\">' + this.yData + ' ' + this.name + '</span>';
// // } "
// //                 );


// // $chart2 -> pane -> startAngle = -150;
// // $chart2 -> pane -> endAngle = 150;
// // $chart2 -> pane -> center =[90, 160];
// // $chart2 -> background = array(
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#FFF'),
// //                 array(1, '#333')
// //             )
// //         ),
// //         'borderWidth' => 0,
// //         'outerRadius' => '109%'
// //     ),
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#333'),
// //                 array(1, '#FFF')
// //             )
// //         ),
// //         'borderWidth' => 1,
// //         'outerRadius' => '107%'
// //     ),
// //     array(),
// //     array(
// //         'backgroundColor' => '#DDD',
// //         'borderWidth' => 0,
// //         'outerRadius' => '105%',
// //         'innerRadius' => '103%'
// //     )
// // );

// // $chart2 -> yAxis -> min=0;
// // $chart2 -> yAxis -> minorTickInterval= 'auto';
// // $chart2 -> yAxis -> minorTickWidth= 1;
// // $chart2 -> yAxis -> minorTickLength= 10;
// // $chart2 -> yAxis -> minorTickPosition= 'inside';
// // $chart2 -> yAxis -> minorTickColor= '#666';
// // $chart2 -> yAxis -> tickPixelInterval= 30;
// // $chart2 -> yAxis -> tickWidth= 2;
// // $chart2 -> yAxis -> tickPosition= 'inside';
// // $chart2 -> yAxis -> tickLength= 10;
// // $chart2 -> yAxis -> tickColor= '#666';
// // $chart2 -> yAxis -> labels= array("step"=> 3, "rotation"=> "auto");
// // $chart2 -> yAxis -> title -> text="Revenue (USD)";
// // $chart2 -> yAxis -> title -> y=20;
// // $chart2 -> yAxis -> title -> style = array('color'=> 'blue', 'width'=> 30, 'fontWeight'=> 'normal', 'fontSize'=> '8px');

// // $colsedGName = "Closed Budget";
// // if ($curMonth == $v) {
// //     $colsedGName = "Current Budget";
// // }


// // if ($max != 0 || $max != NULL) {
// //     $chart2 -> yAxis -> max=max($maxpt, $net_generationpt, $forecast_generationpt, $preMaxpt);
// //     $chart2 -> subtitle -> text= '<span style="background-color: #55BF3B;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($firstPlotBandspt, 1, '.', '').' - '.number_format($maxpt, 1, '.', '').'</span>'.
// //                   '<span style="background-color: #ffbf00;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($secPlotBandspt, 1, '.', '').' - '.number_format($firstPlotBandspt, 1, '.', '').'</span>'.
// //                       '<span style="background-color: #DF5353;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //                           '0 - '.number_format($secPlotBandspt, 1, '.', '').'</span><br>'

// //         .

// //                       '<br><span style="color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.number_format($maxpt, 2, '.', '').' '.$colsedGName. '</span><br>'.

// //                       '<span style="color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.number_format($forexLoss, 2, '.', '').'  Forex Loss</span><br>'

// //         ;


// //     $chart2 -> subtitle -> useHTML= true;
// //     $chart2 -> subtitle -> verticalAlign='top';
// //     $chart2 -> subtitle -> x=-5;
// //     $chart2 -> subtitle -> y=40;
// //     $chart2 -> subtitle -> textOverflow = "none";
// //     $chart2 -> subtitle -> whiteSpace= 'nowrap';
// //     $chart2 -> yAxis -> plotBands[]=array("color"=> '#55BF3B', "from"=> $firstPlotBandspt, "to"=> max($maxpt, $net_generationpt, $forecast_generationpt, $preMaxpt));
// //     $chart2 -> yAxis -> plotBands[]=array("color"=> '#ffbf00', "from"=> $secPlotBandspt, "to"=> $firstPlotBandspt);
// //     $chart2 -> yAxis -> plotBands[]=array("color"=> '#DF5353', "from"=> 0.0, "to"=> $secPlotBandspt);
// // }


// // if ($net_generationpt >= $firstPlotBandspt) {
// //     $colorPt = '#55BF3B';
// // } elseif($net_generationpt < $firstPlotBandspt && $net_generationpt >= $secPlotBandspt){
// //     $colorPt = '#ffbf00';
// // }else {
// //     $colorPt = '#DF5353';
// // }

// // if ($curMonth == $v) {
// //     $dataArray = ['1budget' => $preMaxpt, "2qtd" => $actualBudgetVal, '3actual' => $net_generationpt, '4forecast' => $forecast_generationpt];
// //     $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, true);
// // } else {
// //     $dataArray = ['1budget' => $preMaxpt, '3actual' => $net_generationpt, '4forecast' => $forecast_generationpt];
// //     $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, false);
// // }

// // $chart2 -> series[]=array("name"=> 'Budget',
// //     "showInLegend"=> true,
// //     "color"=> '#000000',
// //     "data"=> array(array("y"=>(float)$preMaxpt, "color"=> '#000000')),
// //     "dial"=> array("backgroundColor"=> '#000000', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['1budget']),
// //     "dataLabels"=> array("enabled"=> false)
// // );

// // if ($curMonth == $v) {
// //     $nameStartDate = $curYear. "-".$curMonth. "-01";
// //     if ($checkQtr) {
// //         $actualBudgetVal = $this -> hgm -> getYrBudgetRev($nameStartDate, $date, $plantIds);
// //         $actualBudgetVal = ((float) $actualBudgetVal / BUDGETED_DOLLAR_VALUE);
// //         $actualBudgetVal = number_format(($actualBudgetVal / 1000000), 2, '.', '');
// //     }
// //     $chart2 -> series[]=array("name"=> 'MTD Budget',
// //         "showInLegend"=> true,
// //         "color"=> '#808080',
// //         "data"=> array(array("y"=>(float)$actualBudgetVal, "color"=> '#808080')),
// //         "dial"=> array("backgroundColor"=> '#808080', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['2qtd']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => ''
// //         ));
// // }

// // $chart2 -> series[]=array("name"=> 'Actual',
// //     "showInLegend"=> true,
// //     "color"=> '#4141FF',
// //     "data"=> array(array("y"=>(float)$net_generationpt, "color"=> '#4141FF')),
// //     "dial"=> array("backgroundColor"=> '#4141FF', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['3actual']),
// //     "dataLabels" => array(
// //         'formatter' => new HighchartJsExpr("function () {
// //                                            return '<span style=\"color:" . $colorPt . "\">".$net_generationpt." Mn</span><br/>'; }"
// //                                        )),
// // 'tooltip' => array(
// //     'valueSuffix' => ''
// // ));

// // $chkYear = date('Y', strtotime($date));
// // $chkMonth = $chmonth - 1;
// // $chkDate = date($chkYear.'-'.$chkMonth.'-1');

// // $curDate2 = date('Y-m-1');

// // $date1 = strtotime($curDate2);
// // $date2 = strtotime($chkDate);
// // $diff = $date2 - $date1;

// // if ($diff >= 0) {
// //     $chart2 -> series[]=array("name"=> 'Forecast',
// //         "showInLegend"=> true,
// //         "color"=> '#FFC200',
// //         "data"=> array(array("y"=>(float)$forecast_generationpt, "color"=> '#FFC200')),
// //         "dial"=> array("backgroundColor"=> '#FFC200', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['4forecast']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => ''
// //         ));
// // }


// // echo $chart2 -> render("chart1");
// //           }



// //   }
// // /**
// //  * [makeGraphrevfigauge description]
// //  * @return [type] [description]
// //  */
// // function makeGraphrevfigauge() {

// //     $graphId = base64_decode($this -> input -> post('graph'));
// //     $canvasId = $this -> input -> post('canvas');
// //     $plantIds = $this -> input -> post('plantIds');
// //     $plantIdsStr = implode(",", $plantIds);
// //     $graphData = $this -> st -> getGraphByGraphId($graphId);
// //     $graphData = $graphData[0];
// //     $date = $this -> hgm -> getEnday($graphData);
// //     $curMonth = date("m", strtotime($date));
// //     $curYear = date("Y", strtotime($date));
// //     $mnthCheck = array("01", "04", "07", "10");
// //     $getQuarter = ceil($curMonth / 3);
// //     $interval = $graphData -> time_interval;
// //     $arrCntQtr = array(1=> 4, 2=> 1, 3=> 2, 4=> 3);
// //     $checkQtr = false;
// //     if (in_array($curMonth, $mnthCheck)) {
// //         $sqlJoin = FALSE;
// //     }
// //     else {
// //         $sqlJoin = TRUE;
// //     }

// //     if ($interval == 1) {
// //         $mnArray = array(4, 5, 6);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-04-01', strtotime("-1 year"));
// //             $date = date('Y-06-30', strtotime("-1 year"));
// //             $bdate = date('Y-06-30', strtotime("-1 year"));
// //             $ext = date('Y', strtotime("-1 year")).'-2';
// //         }
// //         else if ($getQuarter == 3 || $getQuarter == 4) {
// //             $from = date('Y-04-01');
// //             $date = date('Y-06-30');
// //             $bdate = date('Y-06-30');
// //             $ext = date('Y').'-2';
// //         }
// //         else {
// //             $from = date('Y-04-01');
// //             $bdate = date('Y-06-30');
// //             $ext = date('Y').'-2';
// //         }
// //     }
// //     if ($interval == 2) {
// //         $mnArray = array(7, 8, 9);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-07-01', strtotime("-1 year"));
// //             $date = date('Y-09-30', strtotime("-1 year"));
// //             $bdate = date('Y-09-30', strtotime("-1 year"));
// //             $ext = date('Y', strtotime("-1 year")).'-3';
// //         }
// //         else if ($getQuarter == 2 || $getQuarter == 4) {
// //             $from = date('Y-07-01');
// //             $date = date('Y-09-30');
// //             $bdate = date('Y-09-30');
// //             $ext = date('Y').'-3';
// //         }
// //         else {
// //             $from = date('Y-07-01');
// //             $bdate = date('Y-09-30');
// //             $ext = date('Y').'-3';
// //         }
// //     }
// //     if ($interval == 3) {
// //         $mnArray = array(10, 11, 12);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-10-01', strtotime("-1 year"));
// //             $date = date('Y-12-31', strtotime("-1 year"));
// //             $bdate = date('Y-12-31', strtotime("-1 year"));
// //             $ext = date('Y', strtotime("-1 year")).'-4';
// //         }
// //         else if ($getQuarter == 2 || $getQuarter == 3) {
// //             $from = date('Y-10-01');
// //             $date = date('Y-12-31');
// //             $bdate = date('Y-12-31');
// //             $ext = date('Y').'-4';
// //         }
// //         else {
// //             $from = date('Y-10-01');
// //             $bdate = date('Y-12-31');
// //             $ext = date('Y').'-4';
// //         }
// //     }
// //     if ($interval == 4) {
// //         $mnArray = array(1, 2, 3);
// //         $checkQtr = (in_array($curMonth, $mnArray)) ? true : false;
// //         if ($getQuarter == 1) {
// //             $from = date('Y-01-01');
// //             $bdate = date('Y-03-31');
// //             $ext = date('Y').'-1';
// //         }
// //         else {
// //             $from = date('Y-01-01', strtotime("+1 year"));
// //             $date = date('Y-03-31', strtotime("+1 year"));
// //             $bdate = date('Y-03-31', strtotime("+1 year"));
// //             $ext = date('Y', strtotime("+1 year")).'-1';
// //         }

// //     }
// //     //// Tmperorary
// //     if ($interval == $arrCntQtr[$getQuarter]) {
// //         $cndn = 0;
// //     }
// //     else if ($interval > $arrCntQtr[$getQuarter]) {
// //         $cndn = 1;
// //     }
// //     else if ($interval < $arrCntQtr[$getQuarter]) {
// //         $cndn = -1;
// //     }

// //     $time = $graphData -> time_period;
// //     $unit = $graphData -> time_group;
// //     $y1_text = $graphData -> y1_title." (".$graphData -> y1_unit.")";
// //     $colorArr = explode(',', $graphData -> color_code);
// //     $labelArr = explode(',', $graphData -> label);
// //     $deviceArr = explode('!@#', $graphData -> device);
// //     $deviceTextArr = explode('!@#', $graphData -> device_text);
// //     $channelArr = explode(',', $graphData -> channel);
// //     $aggregateArr = explode(',', $graphData -> aggregation);
// //     $colorArr = explode(',', $graphData -> color_code);

// //     if ($graphData -> plant != NULL) {
// //         $plantArr = explode(',', $graphData -> plant);
// //     } else {
// //         $plantArr = array();
// //     }
// //     $queryArray = array();

// //     for ($i = 0; $i < count($labelArr); $i++) {

// //         if ($labelArr[$i] == 'Forecast') {
// //             if ($deviceArr[$i] == "forecast_generation_revenue") {

// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "forecast_generation_revenue") {
// //                     $select = 'forecast_generation';
// //                 }
// //                 $column = 'Forecast';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'month') {
// //                         if ($time == 'quarterly') {

// //                             $query = '';
// //                             $query = " SELECT '".$column."' as individual_name".$i.",".$aggregate."(ld.generation*p.tariff) as data".$i.",ld.year as year".$i.",ld.month as month".$i." FROM plant AS p INNER JOIN lender_detail AS ld ON p.plant_id=ld.plant_id WHERE ld.type='Budget' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$bdate."' AND p.plant_id !=22 AND p.plant_id !=5  AND p.plant_id IN( ".$plantIdsStr.") GROUP BY ld.year,ld.month ";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." ,  t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                             $queryArray[$i] = $query;
// //                         }
// //                     }
// //                 }
// //             }
// //             else if ($deviceArr[$i] == "net_generation_revenue") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "net_generation_revenue") {

// //                     $select = '(pg.actual_generation - pg.import)*p.tariff';
// //                 }
// //                 $column = 'Actual';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'month') {
// //                         $newDate = date('Y-m-t', strtotime($date." first day of last month"));
// //                         $currMFday = date('Y-m-01', strtotime($date));
// //                         $lastMFday = date('Y-m-01', strtotime($date."first day of last month"));
// //                         $query = '';
// //                         if ($time == 'quarterly') {
// //                             if ($interval != $arrCntQtr[$getQuarter]) {
// //                                 $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE pg.date BETWEEN '".$from."' AND '".$date."' AND data_flag = 2 AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") GROUP BY YEAR(pg.date),MONTH(pg.date)";
// //                                 $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;

// //                             }
// //                             else {
// //                                 if ($sqlJoin) {
// //                                     $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE pg.date BETWEEN '".$from."' AND '".$newDate."' AND data_flag = 2 AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") GROUP BY YEAR(pg.date),MONTH(pg.date)";
// //                                     $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
// //                                     LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
// //                                     LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52 AND p.plant_id IN(".$plantIdsStr .") GROUP BY YEAR(pg.date), MONTH(pg.date)";
// //                                     $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                                 }
// //                                 else {
// //                                     $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
// //                                     LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
// //                                     LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52 AND p.plant_id IN(".$plantIdsStr .") GROUP BY YEAR(pg.date), MONTH(pg.date)";
// //                                     $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                                 }
// //                             }
// //                         }
// //                     }
// //                     $queryArray[$i] = $query;
// //                 }
// //             }
// //             else if ($deviceArr[$i] == "generation_budget_revenue") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "generation_budget_revenue") {
// //                     $select = 'budget_generation';
// //                 }
// //                 $column = 'Budget';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'month') {

// //                         if ($time == 'quarterly') {
// //                             $query = '';
// //                             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select."*p.tariff) as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM extended_budget f INNER JOIN plant p ON p.plant_id = f.plant_id WHERE STR_TO_DATE( CONCAT( f.year,  '-', f.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$bdate."' AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") GROUP BY f.year,f.month";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i.",t.month".$i." FROM (".$query.") as t GROUP BY t.year".$i.",t.month".$i." ORDER BY t.month".$i;
// //                             $queryArray[$i] = $query;
// //                         }
// //                     }
// //                 }
// //             }
// //         }


// //     }
// //     // $currencyqueryString = "SELECT * FROM currency where currency_type='USDINR'";
// //     // $currency_result = $this->um->runGivenQuery($currencyqueryString);
// //     // $doller = $currency_result[0]->currency_value;
// //     $BudVal = 0;
// //     $netVal = 0;
// //     $forecastVal = 0;
// //     $net_generation = 0;
// //     $forecast_generation = 0;
// //     $budgetArr = array();
// //     $netArr = array();
// //     $forecastArr = array();
// //     for ($i = 0; $i < count($queryArray); $i++) {
// //         $responseArrayTotal = $this -> um -> runGivenQuery($queryArray[$i]);
// //         if (!empty($responseArrayTotal)) {
// //             $j = 0;
// //             foreach($responseArrayTotal as $responseArray)
// //             {
// //                 if ($responseArray -> { "individual_name".$i } == "Budget") {
// //                     $BudVal += ((float) $responseArray -> { "data".$i });
// //                     $budgetArr[$responseArray -> { "month".$i }] = ((float) $responseArray -> { "data".$i });
// //                 }
// //                 if ($responseArray -> { "individual_name".$i } == "Actual") {
// //                     $netVal += ((float) $responseArray -> { "data".$i });
// //                     $netArr[$responseArray -> { "month".$i }] = ((float) $responseArray -> { "data".$i });

// //                     if ($cndn == -1) {
// //                         if (in_array($j, array(0, 1))) {
// //                             $forecastVal += (float) $responseArray -> { "data".$i };
// //                         }
// //                     }
// //                     else if ($cndn == 0) {
// //                         if ($curMonth > (integer) $responseArray -> { "month".$i })
// //                         {
// //                             $forecastVal += (float) $responseArray -> { "data".$i };
// //                         }
// //                     }

// //                 }
// //                 if ($responseArray -> { "individual_name".$i } == "Forecast") {
// //                     if ($cndn == 1) {
// //                         $forecastVal += (float) $responseArray -> { "data".$i };
// //                     }
// //                     else if ($cndn == 0) {
// //                         if ($curMonth <= (integer) $responseArray -> { "month".$i })
// //                         {
// //                             $forecastVal += (float) $responseArray -> { "data".$i };
// //                         }
// //                     }
// //                     else if ($cndn == -1) {
// //                         if (in_array($j, array(2))) {
// //                             $forecastVal += (float) $responseArray -> { "data".$i };
// //                         }
// //                     }
// //                     $forecastArr[$responseArray -> { "month".$i }] = ((float) $responseArray -> { "data".$i });
// //                 }
// //                 $j++;
// //             }
// //         }
// //     }

// //     $max = number_format(($BudVal / 1000000), 3, '.', '');
// //     $threePFive = ($BudVal - ($BudVal * 0.035));
// //     $nxtthreePFive = ($threePFive - ($threePFive * 0.035));
// //     $firstPlotBands = number_format(($threePFive / 1000000), 3, '.', '');
// //     $secPlotBands = number_format(($nxtthreePFive / 1000000), 3, '.', '');
// //     $net_generation = number_format(((float) $netVal / 1000000), 2, '.', '');
// //     $forecast_generation = number_format(((float) $forecastVal / 1000000), 2, '.', '');

// //     if ($checkQtr) {
// //         $actualBudgetVal = $this -> hgm -> getYrBudgetRev($from, $date, $plantIds);
// //         $actualBudgetVal = number_format(($actualBudgetVal / 1000000), 2, '.', '');
// //     }

// //     $chart = new Ghunti\HighchartsPHP\Highchart();
// //     $chart -> includeExtraScripts();
// //     $chart -> chart = array(
// //         'renderTo'=> "canvas".$canvasId,
// //         'type' => 'gauge',
// //         'spacingTop' => 10,
// //         'spacingLeft' => 15,
// //         'height' => 245
// //     );
// //     $chart -> title -> text= 'Date from: '.date('d/m/Y', strtotime($from)). ' to: '.date('d/m/Y', strtotime($date));
// //     $chart -> title -> style = array('color'=> '#666', 'font'=> 'normal 14px', 'fontSize'=> 13);
// //     $chart -> title -> margin = 10;
// //     $chart -> title -> align = 'center';
// //     $chart -> legend -> allowDecimals=false;
// //     $chart -> legend -> itemWidth=150;
// //     $chart -> legend -> itemStyle=array("cursor"=> 'default', "color"=> 'black', "font" => "9pt Trebuchet MS, Verdana, sans-serif", "fontWeight"=> 'bold');
// //     $chart -> legend -> verticalAlign='top';
// //     $chart -> legend -> layout='vertical';
// //     $chart -> legend -> y=30;
// //     $chart -> legend -> x=405;
// //     $chart -> legend -> align='left';
// //     $chart -> legend -> useHTML=true;
// //     $chart -> legend -> floating=true;
// //     $chart -> legend -> borderRadius=0;
// //     $chart -> legend -> borderWidth=0;
// //     $chart -> legend -> labelFormatter = new HighchartJsExpr("function () {
// //                     return this.yData + ' ' + this.name;
// // } "
// //                 );

// // $chart -> pane -> startAngle = -150;
// // $chart -> pane -> endAngle = 150;
// // $chart -> background = array(
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#FFF'),
// //                 array(1, '#333')
// //             )
// //         ),
// //         'borderWidth' => 0,
// //         'outerRadius' => '109%'
// //     ),
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#333'),
// //                 array(1, '#FFF')
// //             )
// //         ),
// //         'borderWidth' => 1,
// //         'outerRadius' => '107%'
// //     ),
// //     array(),
// //     array(
// //         'backgroundColor' => '#DDD',
// //         'borderWidth' => 0,
// //         'outerRadius' => '105%',
// //         'innerRadius' => '103%'
// //     )
// // );

// // $chart -> yAxis -> min=0;
// // $chart -> yAxis -> minorTickInterval= 'auto';
// // $chart -> yAxis -> minorTickWidth= 1;
// // $chart -> yAxis -> minorTickLength= 10;
// // $chart -> yAxis -> minorTickPosition= 'inside';
// // $chart -> yAxis -> minorTickColor= '#666';
// // $chart -> yAxis -> tickPixelInterval= 30;
// // $chart -> yAxis -> tickWidth= 2;
// // $chart -> yAxis -> tickPosition= 'inside';
// // $chart -> yAxis -> tickLength= 10;
// // $chart -> yAxis -> tickColor= '#666';
// // $chart -> yAxis -> labels= array("step"=> 3, "rotation"=> "auto");
// // $chart -> yAxis -> title -> text="Revenue (INR)";
// // $chart -> yAxis -> title -> y=20;
// // $chart -> yAxis -> title -> style = array('color'=> 'blue', 'width'=> 30, 'fontWeight'=> 'normal', 'fontSize'=> '8px');


// // if ($max != 0 || $max != NULL) {
// //     $subtitleText = '<span style="background-color: #55BF3B;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($firstPlotBands, 1, '.', '').' - '.number_format($max, 1, '.', '').'</span><br>'.
// //                     '<span style="background-color: #ffbf00;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($secPlotBands, 1, '.', '').' - '.number_format($firstPlotBands, 1, '.', '').'</span><br>'.
// //                         '<span style="background-color: #DF5353;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //                             '0 - '.number_format($secPlotBands, 1, '.', '').'</span><br>';
// //     $chart -> subtitle -> text = $subtitleText;

// //     if ($net_generation >= $firstPlotBands) {
// //         $color = '#55BF3B';
// //     } elseif($net_generation < $firstPlotBands && $net_generation >= $secPlotBands){
// //         $color = '#ffbf00';
// //     }else {
// //         $color = '#DF5353';
// //     }

// //     $chart -> subtitle -> useHTML= true;
// //     $chart -> subtitle -> verticalAlign='top';
// //     $chart -> subtitle -> x=10;
// //     $chart -> subtitle -> y=50;
// //     $chart -> subtitle -> align='left';

// //     $chart -> yAxis -> max=max($max, $net_generation, $forecast_generation);
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#55BF3B', "from"=> $firstPlotBands, "to"=> max($max, $net_generation, $forecast_generation));
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#ffbf00', "from"=> $secPlotBands, "to"=> $firstPlotBands);
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#DF5353', "from"=> 0.0, "to"=> $secPlotBands);
// // }

// // if ($checkQtr) {
// //     $dataArray = ['1budget' => $max, '2qtd' => $actualBudgetVal, '3actual' => $net_generation, '4forecast' => $forecast_generation];
// //     $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, true);
// // } else {
// //     $dataArray = ['1budget' => $max, '3actual' => $net_generation, '4forecast' => $forecast_generation];
// //     $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, false);
// // }

// // $chart -> series[]=array("name"=> 'Budget',
// //     "showInLegend"=> true,
// //     "color"=> '#000000',
// //     "data"=> array(array("y"=>(float)$max, "color"=> '#000000')),
// //     "dial"=> array("backgroundColor"=> '#000000', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['1budget']),
// //     "dataLabels"=> array("enabled"=> false),
// //     'tooltip' => array(
// //         'valueSuffix' => ''
// //     ));

// // if ($checkQtr) {
// //     $chart -> series[]=array("name"=> 'QTD Budget',
// //         "showInLegend"=> true,
// //         "color"=> '#808080',
// //         "data"=> array(array("y"=>(float)$actualBudgetVal, "color"=> '#808080')),
// //         "dial"=> array("backgroundColor"=> '#808080', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['2qtd']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => ''
// //         ));
// // }

// // $chart -> series[]=array("name"=> 'Actual',
// //     "showInLegend"=> true,
// //     "color"=> '#4141FF',
// //     "data"=> array(array("y"=>(float)$net_generation, "color"=> '#4141FF')),
// //     "dial"=> array("backgroundColor"=> '#4141FF', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['3actual']),
// //     "dataLabels" => array(
// //         'formatter' => new HighchartJsExpr("function () {
// //                                            return '<span style=\"color: " . $color . "\">".$net_generation." Mn</span><br/>'; }"
// //                                        )),
// // 'tooltip' => array(
// //     'valueSuffix' => ''
// // ));

// // $Date1 = date('Y-m-d');
// // $Date2 = date('Y-m-d', strtotime($Date1. " - 1 day"));

// // $date1 = strtotime($Date2);
// // $date2 = strtotime($date);
// // $diff = $date2 - $date1;

// // if ($diff >= 0) {
// //     $chart -> series[]=array("name"=> 'Forecast',
// //         "showInLegend"=> true,
// //         "color"=> '#FFC200',
// //         "data"=> array(array("y"=>(float)$forecast_generation, "color"=> '#FFC200')),
// //         "dial"=> array("backgroundColor"=> '#FFC200', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['4forecast']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => ''
// //         ));
// // }

// // $chart -> exporting -> buttons -> customButton -> x=-17;
// // $chart -> exporting -> buttons -> customButton -> y=-17;
// // $chart -> exporting -> buttons -> customButton -> align='right';
// // $chart -> exporting -> buttons -> customButton -> verticalAlign='top';
// // $chart -> exporting -> buttons -> customButton -> onclick=new HighchartJsExpr(
// //     "function() {
// //                                   window.open('iateExcelExportEXT/QTD/".$ext."', '_blank');}");
// // $chart -> exporting -> buttons -> customButton -> text= 'Dev <br/>Report';

// // $chart -> exporting -> buttons -> customButton2 -> x=-74;
// // $chart -> exporting -> buttons -> customButton2 -> y=-7;
// // $chart -> exporting -> buttons -> customButton2 -> align='right';
// // $chart -> exporting -> buttons -> customButton2 -> verticalAlign='top';
// // $chart -> exporting -> buttons -> customButton2 -> onclick=new HighchartJsExpr(
// //     "function() {
// //                                    javascript: comparePopUP('" . base64_encode($graphId) . "', '" . $canvasId . "', '" . site_url('highchartgraph / compareRCGraph') . "', '" . site_url('images / bx_loader.gif') . "')}");
// //                                   $chart -> exporting -> buttons -> customButton2 -> text= 'Compare';

// // echo $chart -> render("chart1");
// // foreach($mnArray as $k=> $v)
// // {
// //     if (isset($budgetArr[$v])) {
// //         $maxpt = number_format(($budgetArr[$v] / 1000000), 3, '.', '');
// //         $threePFivept = ($budgetArr[$v] - ($budgetArr[$v] * 0.035));
// //         $nxtthreePFivept = ($threePFivept - ($threePFivept * 0.035));
// //         $firstPlotBandspt = number_format(($threePFivept / 1000000), 3, '.', '');
// //         $secPlotBandspt = number_format(($nxtthreePFivept / 1000000), 3, '.', '');
// //     }
// //     else {
// //         $maxpt = 0.0;
// //         $threePFivept = 0.0;
// //         $nxtthreePFivept = 0.0;
// //         $firstPlotBandspt = 0.0;
// //         $secPlotBandspt = 0.0;
// //     }
// //     if (isset($netArr[$v])) {
// //         $net_generationpt = number_format(((float) $netArr[$v] / 1000000), 2, '.', '');
// //     }
// //     else {
// //         $net_generationpt = 0;
// //     }
// //     if (isset($forecastArr[$v])) {
// //         $forecast_generationpt = number_format(((float) $forecastArr[$v] / 1000000), 2, '.', '');
// //     }
// //     else {
// //         $forecast_generationpt = 0;
// //     }
// //     $chart2 = new Highchart();
// //     $chart2 -> includeExtraScripts();
// //     $chart2 -> chart = array(
// //         'renderTo'=> "canvas".++$k.$canvasId,
// //         'type' => 'gauge',
// //         'spacingTop' => 10,
// //         //'spacingLeft' => 0,
// //         'width' => 200,
// //         'height' => 325
// //     );
// //     $chmonth = $v + 1;
// //     $chart2 -> title -> text= date('F', mktime(0, 0, 0, $chmonth, 0, 0));
// //     $chart2 -> title -> style = array('color'=> '#666', 'fontWeight'=> 'normal', 'width'=> '150px', 'fontSize'=> 13);
// //     $chart2 -> title -> margin = 10;
// //     $chart2 -> title -> align = 'center';

// //     $chart2 -> legend -> allowDecimals=false;
// //     $chart2 -> legend -> itemWidth=150;
// //     $chart2 -> legend -> itemStyle=array("cursor"=> 'default', "color"=> 'black');
// //     $chart2 -> legend -> align='bottom';
// //     $chart2 -> legend -> verticalAlign='top';
// //     $chart2 -> legend -> layout='vertical';
// //     $chart2 -> legend -> x=0;
// //     $chart2 -> legend -> y=220;
// //     $chart2 -> legend -> useHTML=true;
// //     $chart2 -> legend -> floating=true;
// //     $chart2 -> legend -> borderRadius=0;
// //     $chart2 -> legend -> borderWidth=0;
// //     $chart2 -> legend -> labelFormatter = new HighchartJsExpr("function () {
// //                       return '<span style=\"font-size:9px; border-radius: 2px; padding: 1px 2px;\">' + this.yData + ' ' + this.name + '</span>';
// // } "
// //                   );


// // $chart2 -> pane -> startAngle = -150;
// // $chart2 -> pane -> endAngle = 150;
// // $chart2 -> pane -> center =[90, 110];
// // $chart2 -> background = array(
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#FFF'),
// //                 array(1, '#333')
// //             )
// //         ),
// //         'borderWidth' => 0,
// //         'outerRadius' => '109%'
// //     ),
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#333'),
// //                 array(1, '#FFF')
// //             )
// //         ),
// //         'borderWidth' => 1,
// //         'outerRadius' => '107%'
// //     ),
// //     array(),
// //     array(
// //         'backgroundColor' => '#DDD',
// //         'borderWidth' => 0,
// //         'outerRadius' => '105%',
// //         'innerRadius' => '103%'
// //     )
// // );

// // $chart2 -> yAxis -> min=0;
// // $chart2 -> yAxis -> minorTickInterval= 'auto';
// // $chart2 -> yAxis -> minorTickWidth= 1;
// // $chart2 -> yAxis -> minorTickLength= 10;
// // $chart2 -> yAxis -> minorTickPosition= 'inside';
// // $chart2 -> yAxis -> minorTickColor= '#666';
// // $chart2 -> yAxis -> tickPixelInterval= 30;
// // $chart2 -> yAxis -> tickWidth= 2;
// // $chart2 -> yAxis -> tickPosition= 'inside';
// // $chart2 -> yAxis -> tickLength= 10;
// // $chart2 -> yAxis -> tickColor= '#666';
// // $chart2 -> yAxis -> labels= array("step"=> 3, "rotation"=> "auto");
// // $chart2 -> yAxis -> title -> text="Revenue (INR)";
// // $chart2 -> yAxis -> title -> y=20;
// // $chart2 -> yAxis -> title -> style = array('color'=> 'blue', 'width'=> 30, 'fontWeight'=> 'normal', 'fontSize'=> '8px');


// // if ($max != 0 || $max != NULL) {
// //     $chart2 -> yAxis -> max=max($maxpt, $net_generationpt, $forecast_generationpt);
// //     $chart2 -> subtitle -> text= '<span style="background-color: #55BF3B;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($firstPlotBandspt, 1, '.', '').' - '.number_format($maxpt, 1, '.', '').'</span>'.
// //                     '<span style="background-color: #ffbf00;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($secPlotBandspt, 1, '.', '').' - '.number_format($firstPlotBandspt, 1, '.', '').'</span>'.
// //                         '<span style="background-color: #DF5353;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">'.
// //                             '0 - '.number_format($secPlotBandspt, 1, '.', '').'</span><br>';

// //     $chart2 -> subtitle -> useHTML= true;
// //     $chart2 -> subtitle -> verticalAlign='top';
// //     $chart2 -> subtitle -> x=-5;
// //     $chart2 -> subtitle -> y=40;
// //     $chart2 -> subtitle -> textOverflow = "none";
// //     $chart2 -> subtitle -> whiteSpace= 'nowrap';
// //     $chart2 -> yAxis -> plotBands[]=array("color"=> '#55BF3B', "from"=> $firstPlotBandspt, "to"=> max($maxpt, $net_generationpt, $forecast_generationpt));
// //     $chart2 -> yAxis -> plotBands[]=array("color"=> '#ffbf00', "from"=> $secPlotBandspt, "to"=> $firstPlotBandspt);
// //     $chart2 -> yAxis -> plotBands[]=array("color"=> '#DF5353', "from"=> 0.0, "to"=> $secPlotBandspt);
// // }


// // if ($net_generationpt >= $firstPlotBandspt) {
// //     $colorPt = '#55BF3B';
// // } elseif($net_generationpt < $firstPlotBandspt && $net_generationpt >= $secPlotBandspt){
// //     $colorPt = '#ffbf00';
// // }else {
// //     $colorPt = '#DF5353';
// // }

// // if ($curMonth == $v) {
// //     $dataArray = ['1budget' => $maxpt, '2qtd' => $actualBudgetVal, '3actual' => $net_generationpt, '4forecast' => $forecast_generationpt];
// //     $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, true);
// // } else {
// //     $dataArray = ['1budget' => $maxpt, '3actual' => $net_generationpt, '4forecast' => $forecast_generationpt];
// //     $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, false);
// // }

// // $chart2 -> series[]=array("name"=> 'Budget',
// //     "showInLegend"=> true,
// //     "color"=> '#000000',
// //     "data"=> array(array("y"=>(float)$maxpt, "color"=> '#000000')),
// //     "dial"=> array("backgroundColor"=> '#000000', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['1budget']),
// //     "dataLabels"=> array("enabled"=> false)
// // );

// // if ($curMonth == $v) {
// //     $nameStartDate = $curYear. "-".$curMonth. "-01";
// //     if ($checkQtr) {
// //         $actualBudgetVal = $this -> hgm -> getYrBudgetRev($nameStartDate, $date, $plantIds);
// //         $actualBudgetVal = number_format(($actualBudgetVal / 1000000), 2, '.', '');
// //     }
// //     $chart2 -> series[]=array("name"=> 'MTD Budget',
// //         "showInLegend"=> true,
// //         "color"=> '#808080',
// //         "data"=> array(array("y"=>(float)$actualBudgetVal, "color"=> '#808080')),
// //         "dial"=> array("backgroundColor"=> '#808080', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['2qtd']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => ''
// //         ));
// // }

// // $chart2 -> series[]=array("name"=> 'Actual',
// //     "showInLegend"=> true,
// //     "color"=> '#4141FF',
// //     "data"=> array(array("y"=>(float)$net_generationpt, "color"=> '#4141FF')),
// //     "dial"=> array("backgroundColor"=> '#4141FF', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['3actual']),
// //     "dataLabels" => array(
// //         'formatter' => new HighchartJsExpr("function () {
// //                                              return '<span style=\"color:" . $colorPt . "\">".$net_generationpt." Mn</span><br/>'; }"
// //                                          )),
// // 'tooltip' => array(
// //     'valueSuffix' => ''
// // ));


// // $chkYear = date('Y', strtotime($date));
// // $chkMonth = $chmonth - 1;
// // $chkDate = date($chkYear.'-'.$chkMonth.'-1');

// // $curDate2 = date('Y-m-1');

// // $date1 = strtotime($curDate2);
// // $date2 = strtotime($chkDate);
// // $diff = $date2 - $date1;

// // if ($diff >= 0) {
// //     $chart2 -> series[]=array("name"=> 'Forecast',
// //         "showInLegend"=> true,
// //         "color"=> '#FFC200',
// //         "data"=> array(array("y"=>(float)$forecast_generationpt, "color"=> '#FFC200')),
// //         "dial"=> array("backgroundColor"=> '#FFC200', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['4forecast']),
// //         "dataLabels"=> array("enabled"=> false),
// //         'tooltip' => array(
// //             'valueSuffix' => ''
// //         ));
// // }
// // echo $chart2 -> render("chart1");
// //             }
// //   }


// // /** 
// //   Make Graph for Penalty data 
// //   Graph type Waterfall
// // **/

// // public function makeGraphPenalty() {

// //     $graphId = base64_decode($this -> input -> post('graph'));
// //     $canvasId = $this -> input -> post('canvas');
// //     $plantIds = $this -> input -> post('plantIds');
// //     $plantIdsStr = implode(",", $plantIds);

// //     list($from, $date, $bdate, $interval, $time, $unit, $mnArray, $curMonth, $curYear) = $this -> hgm -> getGraphDetails($graphId);

// //     $penaltyData = $this -> hgm -> getPenaltyData($from, $bdate);
// //     $revenueData = $this -> hgm -> getRevenueINR($from, $date, $curMonth, $interval, $plantIdsStr);

// //     $netRevenue = 0;
// //     foreach($revenueData as $rdata){
// //         $netRevenue += $rdata -> data;
// //         $montRData[$rdata -> month] = $rdata -> data;
// //     }

// //     $netRevenue = (float)($netRevenue / 1000000);

// //     $monthPdata = [];
// //     $trialPdata = 0;
// //     $applicablePdata = 0;
// //     $nApplicablePdata = 0;
// //     foreach($penaltyData as $pdata){
// //         if ($pdata -> penalty_data_plant_type == 'Applicable')
// //             $applicablePdata += $pdata -> pdata;
// //         if ($pdata -> penalty_data_plant_type == 'N/A')
// //             $nApplicablePdata += $pdata -> pdata;
// //         if ($pdata -> penalty_data_plant_type == 'Trial')
// //             $trialPdata += $pdata -> pdata;
// //         $monthPdata[$pdata -> month][$pdata -> penalty_data_plant_type] = $pdata -> pdata;
// //     }

// //     $applicablePdata = (float)($applicablePdata / 1000000);
// //     $nApplicablePdata = (float)($nApplicablePdata / 1000000);
// //     $trialPdata = (float)($trialPdata / 1000000);

// //     if (!empty($netRevenue) && $netRevenue != 0) {
// //         $aPercentage = ($applicablePdata / $netRevenue) * 100;
// //         $nAPercentage = ($nApplicablePdata / $netRevenue) * 100;
// //         $tPercentage = ($trialPdata / $netRevenue) * 100;
// //     } else {
// //         $aPercentage = 0;
// //         $nAPercentage = 0;
// //         $tPercentage = 0;
// //     }

// //     //echo "=====Applic=====" . $applicablePdata . "====notapplic===" . $nApplicablePdata . "====netrevenue====" . $netRevenue . "====trial====" . $trialPdata . "========";

// //     /*penalty data graph colour*/
// //     $penaltyColourAll = $penaltyColourApplicable = $penaltyColourTrial = $penaltyColourNa = '';


// //     $colours = $this -> pdm -> getPenaltyColour();
// //     foreach($colours as $value) {
// //         if ($value -> penalty_type == 'All')
// //             $penaltyColourAll = $value -> penalty_colour;
// //         if ($value -> penalty_type == 'Applicable')
// //             $penaltyColourApplicable = $value -> penalty_colour;
// //         if ($value -> penalty_type == 'Trial')
// //             $penaltyColourTrial = $value -> penalty_colour;
// //         if ($value -> penalty_type == 'N/A')
// //             $penaltyColourNa = $value -> penalty_colour;
// //     }



// //     $chart = new Highchart();
// //     $chart -> includeExtraScripts();
// //     $chart -> chart = array(
// //         'renderTo'=> "canvas".$canvasId,
// //         'type' => 'waterfall',
// //         'spacingTop' => 10,
// //         'spacingLeft' => 15,
// //         'height' => 245
// //     );

// //     $chart -> title -> text = 'Date from: '.date('d/m/Y', strtotime($from)). ' to: '.date('d/m/Y', strtotime($date));
// //     $chart -> xAxis -> type = 'category';
// //     $chart -> xAxis -> reversed = true;
// //     $chart -> xAxis -> title -> text = 'Types of Plants';
// //     $chart -> yAxis -> title -> text = 'Penalty (% of Revenue)';
// //     $chart -> legend -> enabled = false;
// //     $chart -> tooltip -> pointFormat = '<b>{point.y:,.2f}</b> %';
// //     $chart -> series = array(
// //         array(
// //             'upColor' => new HighchartJsExpr('Highcharts.getOptions().colors[2]'),
// //             'color' => new HighchartJsExpr('Highcharts.getOptions().colors[3]'),
// //             'data' => array(
// //                 array(
// //                     'name' => 'N/A',
// //                     'y' => $nAPercentage,
// //                     'color' =>(isset($penaltyColourNa)) ? $penaltyColourNa : '#FB6D25'
// //                 ),
// //                 array(
// //                     'name' => 'Trial',
// //                     'y' => $tPercentage,
// //                     'color' =>(isset($penaltyColourTrial)) ? $penaltyColourTrial : '#FB6D25'
// //                 ),
// //                 array(
// //                     'name' => 'Applicable',
// //                     'y' => $aPercentage,
// //                     'color' =>(isset($penaltyColourApplicable)) ? $penaltyColourApplicable : '#FB6D25'
// //                 ),
// //                 array(
// //                     'name' => 'All',
// //                     'isSum' => true,
// //                     'color' =>(isset($penaltyColourAll)) ? $penaltyColourAll : '#4467C3'
// //                 )
// //             ),
// //             'dataLabels' => array(
// //                 'enabled' => true,
// //                 'formatter' => new HighchartJsExpr("function () {
// //                         return Highcharts.numberFormat(this.y, 2, '.') + '%';
// // } "
// //                 ),
// // 'style' => array(
// //     'color' => '#FFFFFF',
// //     'fontWeight' => 'bold',
// //     'textShadow' => '0px 0px 3px black'
// // )
// //             ),
// // 'pointPadding' => 0
// //         )
// //     );

// // echo $chart -> render("chart1");

// // foreach($mnArray as $k=> $v)
// // {
// //     $chart2 = new Highchart();
// //     $chart2 -> includeExtraScripts();
// //     $chart2 -> chart = array(
// //         'renderTo'=> "canvas".++$k.$canvasId,
// //         'type' => 'waterfall',
// //         'spacingTop' => 10,
// //         'width' => 200,
// //         'height' => 325
// //     );

// //     $netRevenue = 0;
// //     if (!empty($montRData[$v]))
// //         $netRevenue = $montRData[$v];
// //     $netRevenue = (float)($netRevenue / 1000000);


// //     $applicablePdata = 0;
// //     $nApplicablePdata = 0;
// //     $trialPdata = 0;

// //     if (!empty($monthPdata[$v]['Applicable']))
// //         $applicablePdata = $monthPdata[$v]['Applicable'];
// //     if (!empty($monthPdata[$v]['N/A']))
// //         $nApplicablePdata = $monthPdata[$v]['N/A'];
// //     if (!empty($monthPdata[$v]['Trial']))
// //         $trialPdata = $monthPdata[$v]['Trial'];

// //     $applicablePdata = (float)($applicablePdata / 1000000);
// //     $nApplicablePdata = (float)($nApplicablePdata / 1000000);
// //     $trialPdata = (float)($trialPdata / 1000000);

// //     if (!empty($netRevenue) && $netRevenue != 0) {
// //         $aPercentage = ($applicablePdata / $netRevenue) * 100;
// //         $nAPercentage = ($nApplicablePdata / $netRevenue) * 100;
// //         $tPercentage = ($trialPdata / $netRevenue) * 100;
// //     } else {
// //         $aPercentage = 0;
// //         $nAPercentage = 0;
// //         $tPercentage = 0;
// //     }

// //     $chmonth = $v + 1;
// //     $chart2 -> title -> text = date('F', mktime(0, 0, 0, $chmonth, 0, 0));
// //     $chart2 -> xAxis -> type = 'category';
// //     $chart2 -> xAxis -> reversed = true;
// //     $chart2 -> xAxis -> title -> text = '';
// //     $chart2 -> yAxis -> title -> text = '';
// //     $chart2 -> legend -> enabled = false;
// //     $chart2 -> tooltip -> pointFormat = '<b>{point.y:,.2f}</b>%';
// //     $chart2 -> series = array(
// //         array(
// //             'upColor' => new HighchartJsExpr('Highcharts.getOptions().colors[2]'),
// //             'color' => new HighchartJsExpr('Highcharts.getOptions().colors[3]'),
// //             'data' => array(
// //                 array(
// //                     'name' => 'N/A',
// //                     'y' => $nAPercentage,
// //                     'color' =>(isset($penaltyColourNa)) ? $penaltyColourNa : '#FB6D25'
// //                 ),
// //                 array(
// //                     'name' => 'Trial',
// //                     'y' => $tPercentage,
// //                     'color' =>(isset($penaltyColourTrial)) ? $penaltyColourTrial : '#FB6D25'
// //                 ),
// //                 array(
// //                     'name' => 'Applicable',
// //                     'y' => $aPercentage,
// //                     'color' =>(isset($penaltyColourApplicable)) ? $penaltyColourApplicable : '#FB6D25'
// //                 ),
// //                 array(
// //                     'name' => 'All',
// //                     'isSum' => true,
// //                     'color' =>(isset($penaltyColourAll)) ? $penaltyColourAll : '#4467C3'
// //                 )

// //             ),
// //             'dataLabels' => array(
// //                 'enabled' => true,
// //                 'formatter' => new HighchartJsExpr("function () {
// //                           return Highcharts.numberFormat(this.y, 2, '.') + '%';
// // } "
// //                   ),
// // 'style' => array(
// //     'color' => '#FFFFFF',
// //     'fontWeight' => 'bold',
// //     'textShadow' => '0px 0px 3px black'
// // )
// //               ),
// // 'pointPadding' => 0
// //           )
// //       );

// // echo $chart2 -> render("chart1");
// //     }


// //   }


// // public function makeGraphYrPenalty() {

// //     $graphId = base64_decode($this -> input -> post('graph'));
// //     $canvasId = $this -> input -> post('canvas');
// //     $plantIds = $this -> input -> post('plantIds');
// //     $plantIdsStr = implode(",", $plantIds);

// //     //list($from, $date, $bdate, $interval, $time, $unit, $mnArray, $curMonth, $curYear) = $this->hgm->getGraphDetails($graphId);

// //     $graphData = $this -> st -> getGraphByGraphId($graphId);
// //     $graphData = $graphData[0];
// //     $date = $this -> hgm -> getEnday($graphData);

// //     $curMonth = date("m", strtotime($date));
// //     $chkmonth = array(1, 2, 3);
// //     if (in_array($curMonth, $chkmonth)) {
// //         $from = date("Y-04-01", strtotime('-1 year'));
// //         $bdate = date("Y-03-31");
// //     }
// //     else {
// //         $from = date("Y-04-01");
// //         $bdate = date("Y-03-31", strtotime('1 year'));
// //     }



// //     $penaltyData = $this -> hgm -> getYrPenaltyData($from, $bdate);
// //     $revenueData = $this -> hgm -> getYrRevenueINR($date, $from, $plantIdsStr);

// //     $netRevenue = 0;
// //     foreach($revenueData as $rdata){
// //         $netRevenue += $rdata -> data;
// //         $montRData[$rdata -> month] = $rdata -> data;
// //     }

// //     $netRevenue = (float)($netRevenue / 1000000);

// //     $monthPdata = [];
// //     $trialPdata = 0;
// //     $applicablePdata = 0;
// //     $nApplicablePdata = 0;
// //     foreach($penaltyData as $pdata){
// //         if ($pdata -> penalty_data_plant_type == 'Applicable')
// //             $applicablePdata += $pdata -> pdata;
// //         if ($pdata -> penalty_data_plant_type == 'N/A')
// //             $nApplicablePdata += $pdata -> pdata;
// //         if ($pdata -> penalty_data_plant_type == 'Trial')
// //             $trialPdata += $pdata -> pdata;
// //         $monthPdata[$pdata -> month][$pdata -> penalty_data_plant_type] = $pdata -> pdata;
// //     }

// //     $applicablePdata = (float)($applicablePdata / 1000000);
// //     $nApplicablePdata = (float)($nApplicablePdata / 1000000);
// //     $trialPdata = (float)($trialPdata / 1000000);

// //     if (!empty($netRevenue) && $netRevenue != 0) {
// //         $aPercentage = ($applicablePdata / $netRevenue) * 100;
// //         $nAPercentage = ($nApplicablePdata / $netRevenue) * 100;
// //         $tPercentage = ($trialPdata / $netRevenue) * 100;
// //     } else {
// //         $aPercentage = 0;
// //         $nAPercentage = 0;
// //         $tPercentage = 0;
// //     }

// //     // echo "=====Applic=====" . $applicablePdata . "====notapplic===" . $nApplicablePdata . "====netrevenue====" . $netRevenue . "====trial====" . $trialPdata . "========";

// //     $chart = new Highchart();
// //     $chart -> includeExtraScripts();
// //     $chart -> chart = array(
// //         'renderTo'=> "canvas".$canvasId,
// //         'type' => 'waterfall',
// //         'spacingTop' => 10,
// //         'spacingLeft' => 15,
// //         'height' => 600
// //     );

// //     $chart -> title -> text = 'Date from: '.date('d/m/Y', strtotime($from)). ' to: '.date('d/m/Y', strtotime($date));
// //     $chart -> xAxis -> type = 'category';
// //     $chart -> xAxis -> title -> text = 'Types of Plants';
// //     $chart -> yAxis -> title -> text = 'Penalty (% of Revenue)';
// //     $chart -> legend -> enabled = false;
// //     $chart -> tooltip -> pointFormat = '<b>{point.y:,.2f}</b> %';
// //     $chart -> series = array(
// //         array(
// //             'upColor' => new HighchartJsExpr('Highcharts.getOptions().colors[2]'),
// //             'color' => new HighchartJsExpr('Highcharts.getOptions().colors[3]'),
// //             'data' => array(
// //                 array(
// //                     'name' => 'N/A',
// //                     'y' => $nAPercentage
// //                 ),
// //                 array(
// //                     'name' => 'Applicable',
// //                     'y' => $aPercentage
// //                 ),
// //                 array(
// //                     'name' => 'Trial',
// //                     'y' => $tPercentage
// //                 ),
// //                 array(
// //                     'name' => 'All',
// //                     'isSum' => true,
// //                     'color' => new HighchartJsExpr('Highcharts.getOptions().colors[1]')
// //                 )
// //             ),
// //             'dataLabels' => array(
// //                 'enabled' => true,
// //                 'formatter' => new HighchartJsExpr("function () {
// //                         return Highcharts.numberFormat(this.y, 2, '.') + '%';
// // } "
// //                 ),
// // 'style' => array(
// //     'color' => '#FFFFFF',
// //     'fontWeight' => 'bold',
// //     'textShadow' => '0px 0px 3px black'
// // )
// //             ),
// // 'pointPadding' => 0
// //         )
// //     );

// // echo $chart -> render("chart1");
    
// //   }


// // /**
// //  * [makeGraphfyrgauge description]
// //  * @return [type] [description]
// //  */
// // public function makeGraphfyrgauge() {

// //     $graphId = base64_decode($this -> input -> post('graph'));
// //     $canvasId = $this -> input -> post('canvas');
// //     $plantIds = $this -> input -> post('plantIds');
// //     $plantIdsStr = implode(",", $plantIds);
// //     $graphData = $this -> st -> getGraphByGraphId($graphId);
// //     $graphData = $graphData[0];
// //     $date = $this -> hgm -> getEnday($graphData);
// //     $curMonth = date("m", strtotime($date));
// //     $chkmonth = array(1, 2, 3);
// //     if (in_array($curMonth, $chkmonth)) {
// //         $from = date("Y-04-01", strtotime('-1 year'));
// //         $bdate = date("Y-03-31");
// //     }
// //     else {
// //         $from = date("Y-04-01");
// //         $bdate = date("Y-03-31", strtotime('1 year'));
// //     }

// //     $time = $graphData -> time_period;
// //     $unit = $graphData -> time_group;
// //     $y1_text = $graphData -> y1_title." (".$graphData -> y1_unit.")";
// //     $colorArr = explode(',', $graphData -> color_code);
// //     $labelArr = explode(',', $graphData -> label);
// //     $deviceArr = explode('!@#', $graphData -> device);
// //     $deviceTextArr = explode('!@#', $graphData -> device_text);
// //     $channelArr = explode(',', $graphData -> channel);
// //     $aggregateArr = explode(',', $graphData -> aggregation);
// //     $colorArr = explode(',', $graphData -> color_code);



// //     if ($graphData -> plant != NULL) {
// //         $plantArr = explode(',', $graphData -> plant);
// //     } else {
// //         $plantArr = array();
// //     }
// //     $queryArray = array();

// //     for ($i = 0; $i < count($labelArr); $i++) {

// //         if ($labelArr[$i] == 'Forecast') {
// //             if ($deviceArr[$i] == "forecast_generation_revenue") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "forecast_generation_revenue") {
// //                     $select = 'forecast_generation';
// //                 }
// //                 $column = 'Forecast';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'year') {
// //                         $totDate = date('t', strtotime($date));
// //                         $TDate = date('d', strtotime($date));
// //                         $currMLday = date('Y-m-'.$totDate, strtotime($date));
// //                         $currMFday = date('Y-m-01', strtotime($date));
// //                         $nextMFday = date('Y-m-01', strtotime($date."first day of next month"));
// //                         if ($time == 'fyear') {

// //                             $query = '';
// //                             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."((ld.generation*p.tariff)/(".$totDate.")*(".$totDate." - ".$TDate.")) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM lender_detail as ld INNER JOIN plant p ON p.plant_id = ld.plant_id WHERE ld.type='Budget' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$currMFday."' AND '".$currMLday."' AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") ";
// //                             $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(ld.generation*p.tariff) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM lender_detail as ld INNER JOIN plant p ON p.plant_id = ld.plant_id WHERE ld.type='Budget' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$nextMFday."' AND '".$bdate."' AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") ";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." FROM (".$query.") as t ";
// //                             $queryArray[$i] = $query;
// //                         }
// //                     }
// //                 }
// //             }
// //             else if ($deviceArr[$i] == "net_generation_revenue") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "net_generation_revenue") {

// //                     $select = '(pg.actual_generation - pg.import)*p.tariff';
// //                 }
// //                 $column = 'Actual';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'year') {
// //                         $newDate = date('Y-m-t', strtotime($date." first day of last month"));
// //                         $currMFday = date('Y-m-01', strtotime($date));
// //                         $lastMFday = date('Y-m-01', strtotime($date."first day of last month"));
// //                         $query = '';
// //                         if ($time == 'fyear') {

// //                             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year(pg.date) as year".$i.",month(pg.date) as month".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE pg.date BETWEEN '".$from."' AND '".$newDate."' AND data_flag = 2 AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") GROUP BY YEAR(pg.date)";
// //                             $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i.",month('".$currMFday."') as month".$i." FROM plant AS p
// //                             LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
// //                             LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52 AND p.plant_id IN(".$plantIdsStr .") GROUP BY YEAR(pg.date)";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i.", t.month".$i."  FROM (".$query.") as t ";

// //                         }
// //                     }
// //                     $queryArray[$i] = $query;
// //                 }
// //             }
// //             else if ($deviceArr[$i] == "generation_budget_revenue") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "generation_budget_revenue") {
// //                     $select = 'budget_generation';
// //                     $type = 'Budget';
// //                 }
// //                 $column = 'Budget';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'year') {
// //                         if ($time == 'fyear') {
// //                             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select."*p.tariff) as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM extended_budget f INNER JOIN plant p ON p.plant_id = f.plant_id WHERE STR_TO_DATE( CONCAT( f.year,  '-', f.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$bdate."' AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") ";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." FROM (".$query.") as t GROUP BY t.year".$i;

// //                         }
// //                         $queryArray[$i] = $query;
// //                     }
// //                 }
// //             }
// //             if ($deviceArr[$i] == "forecast_generation") {

// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "forecast_generation") {
// //                     $select = 'forecast_generation';
// //                 }
// //                 $column = 'Forecast';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'year') {
// //                         $totDate = date('t', strtotime($date));
// //                         $currMLday = date('Y-m-'.$totDate, strtotime($date));
// //                         $TDate = date('d', strtotime($date));
// //                         $currMFday = date('Y-m-01', strtotime($date));
// //                         $nextMFday = date('Y-m-01', strtotime($date."first day of next month"));
// //                         if ($time == 'fyear') {
// //                             $query = '';
// //                             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."((ld.generation)/(".$totDate.")*(".$totDate." - ".$TDate.")) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM lender_detail as ld INNER JOIN plant p ON p.plant_id = ld.plant_id WHERE ld.type='Budget' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$currMFday."' AND '".$date."' AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.")";
// //                             $query.= " UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(ld.generation) as data".$i.",year('".$from."') as year".$i.",ld.month as month".$i." FROM lender_detail as ld INNER JOIN plant p ON p.plant_id = ld.plant_id WHERE ld.type='Budget' AND STR_TO_DATE( CONCAT( ld.year,  '-', ld.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$nextMFday."' AND '".$bdate."' AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") ";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." FROM (".$query.") as t ";
// //                             $queryArray[$i] = $query;
// //                         }
// //                     }
// //                 }
// //             }
// //             else if ($deviceArr[$i] == "net_generation") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "net_generation") {

// //                     $select = 'actual_generation - import';
// //                 }
// //                 $column = 'Actual';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'year') {
// //                         $newDate = date('Y-m-t', strtotime($date." first day of last month"));
// //                         $currMFday = date('Y-m-01', strtotime($date));
// //                         $lastMFday = date('Y-m-01', strtotime($date."first day of last month"));
// //                         $query = '';
// //                         if ($time == 'fyear') {
// //                             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$from."') as year".$i." FROM plant_generation pg INNER JOIN plant p ON p.plant_id = pg.plant_id WHERE p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") AND pg.date BETWEEN '".$from."' AND '".$newDate."' AND data_flag = 2 ";
// //                             $query.= "UNION SELECT '".$column."' as individual_name".$i.",".$aggregate."(".$select.") as data".$i.",year('".$currMFday."') as year".$i." FROM plant AS p
// //                             LEFT OUTER  JOIN(select plant_id, jmr_date from plant_generation where month(date) = month('".$lastMFday."') and year(date) = year('".$lastMFday."') and data_flag = 2) as pg2 on p.plant_id = pg2.plant_id
// //                             LEFT OUTER  JOIN plant_generation AS pg ON p.plant_id = pg.plant_id  AND pg.date BETWEEN IFNULL(pg2.jmr_date, '".$currMFday."') AND '".$date."' AND pg.data_flag = 1 WHERE p.plant_id != 22 AND p.plant_id != 52 AND p.plant_id IN(".$plantIdsStr .") ";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.", t.year".$i." FROM (".$query.") as t ";
// //                         }

// //                     }
// //                     $queryArray[$i] = $query;
// //                 }
// //             }
// //             else if ($deviceArr[$i] == "generation_budget") {
// //                 if ($aggregateArr[$i] == '') {
// //                     $aggregate = 'SUM';
// //                 } else {
// //                     $aggregate = $aggregateArr[$i];
// //                 }
// //                 $select = $deviceArr[$i];
// //                 if ($select == "generation_budget") {
// //                     $select = 'budget_generation';
// //                 }
// //                 $column = 'Budget';
// //                 if (empty($plantArr)) {
// //                     if ($unit == 'year') {
// //                         if ($time == 'fyear') {
// //                             $query = '';
// //                             $query = "SELECT '".$column."' as individual_name".$i.",".$aggregateArr[$i]."(".$select.") as data".$i.",year('".$from."') as year".$i.",f.month as month".$i." FROM extended_budget f INNER JOIN plant p ON p.plant_id = f.plant_id WHERE STR_TO_DATE( CONCAT( f.year,  '-', f.month,  '-01' ) ,  '%Y-%m-%d' ) BETWEEN '".$from."' AND '".$bdate."' AND p.plant_id !=22 AND p.plant_id !=52 AND p.plant_id IN( ".$plantIdsStr.") ";
// //                             $query = "SELECT t.individual_name".$i." ,SUM(t.data".$i.") as data".$i.",t.year".$i." FROM (".$query.") as t GROUP BY t.year".$i;
// //                             $queryArray[$i] = $query;
// //                         }
// //                     }
// //                 }
// //             }
// //         }
// //     }

// //     $datetime1 = new DateTime(date('Y-m-d', strtotime($from)));
// //     $datetime2 = new DateTime(date('Y-m-d', strtotime($date)));
// //     $datetime3 = new DateTime(date('Y-m-d', strtotime($bdate)));
// //     $interval = $datetime1 -> diff($datetime2);
// //     $interval2 = $datetime1 -> diff($datetime3);
// //     $nDays = $interval -> format('%a') + 1;
// //     $fDays = $interval2 -> format('%a') + 1;
// //     if (in_array('net_generation_revenue', $deviceArr)) {
// //         $info = '';
// //         if (strstr($graphData -> graph_name, "INR")) {
// //             $currency = "INR";
// //         } else {
// //             $currency = "USD";
// //         }
// //         list($forecast_generation, $net_generation, $max, $firstPlotBands, $secPlotBands, $doller, $preBudVal, $preBudValPrev) = $this -> hgm -> yearRevGraphData($queryArray, $currency);

// //         if (strstr($graphData -> graph_name, "INR")) {
// //             $actualBudgetVal = $this -> hgm -> getYrBudgetRev($from, $date, $plantIds);
// //             $actualBudgetVal = number_format(($actualBudgetVal / 1000000), 3, '.', '');
// //         } else {
// //             $actualBudgetVal = $this -> hgm -> getYrBudgetRev($from, $date, $plantIds);
// //             $actualBudgetVal = ((float) $actualBudgetVal / BUDGETED_DOLLAR_VALUE);
// //             $actualBudgetVal = number_format(($actualBudgetVal / 1000000), 3, '.', '');
// //         }

// //         if (strstr($graphData -> graph_name, "INR")) {
// //             $txt = "Revenue (INR)";
// //             $txtSfx = "";
// //             $dml = "Mn";
// //         } else {
// //             $txt = "Revenue (USD)";
// //             $txtSfx = "";
// //             $dml = "Mn";
// //             $info = '<br><div style="width:100%"><div style="width:49%;float:left;text-align:left"><span style="color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">1(USD)$='.number_format($doller, 2, '.', '').'&nbsp;(INR)&nbsp;&#8377; (Current)</span><br><span style="color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">1(USD)$='.number_format(BUDGETED_DOLLAR_VALUE, 2, '.', '').'(INR)&nbsp;&#8377;(Budgeted)</span></div>';

// //         }


// //     }
// //     if (in_array('net_generation', $deviceArr)) {
// //         $txt = "Generation (KWh)";
// //         $txtSfx = "MU ";
// //         $dml = "MU";
// //         $info = '';
// //         for ($i = 0; $i < count($queryArray); $i++) {
// //             $responseArray = $this -> um -> runGivenQuery($queryArray[$i]);
// //             $responseArray = $responseArray[0];
// //             if ($responseArray -> { "individual_name".$i } == "Budget") {
// //                 $BudVal = ((float) $responseArray -> { "data".$i });
// //                 $max = number_format(($BudVal / 1000000), 3, '.', '');
// //                 $threePFive = ($BudVal - ($BudVal * 0.035));
// //                 $nxtthreePFive = ($threePFive - ($threePFive * 0.035));
// //                 $firstPlotBands = number_format(($threePFive / 1000000), 3, '.', '');
// //                 $secPlotBands = number_format(($nxtthreePFive / 1000000), 3, '.', '');
// //             }
// //             if ($responseArray -> { "individual_name".$i } == "Actual") {
// //                 $net_generation = number_format((((float) $responseArray -> { "data".$i }) / 1000000), 2, '.', '');
// //                 $netVal = (float) $responseArray -> { "data".$i };
// //             }
// //             if ($responseArray -> { "individual_name".$i } == "Forecast") {

// //                 $finalForeValue = $netVal + (float) $responseArray -> { "data".$i };
// //                 $forecast_generation = number_format((($finalForeValue) / 1000000), 2, '.', '');

// //             }

// //         }
// //         $actualBudgetVal = $this -> hgm -> getYrBudgetGen($from, $date, $plantIds);
// //         $actualBudgetVal = number_format(($actualBudgetVal / 1000000), 3, '.', '');
// //     }

// //     /**/
// //     if (isset($preBudVal)) {
// //         $threePFive = ($preBudValPrev - ($preBudValPrev * 0.035));
// //         $nxtthreePFive = ($threePFive - ($threePFive * 0.035));
// //         $firstPlotBands = number_format(($threePFive / 1000000), 3, '.', '');
// //         $secPlotBands = number_format(($nxtthreePFive / 1000000), 3, '.', '');
// //     }

// //     /**/

// //     if (!isset($preBudVal)) {
// //         $preBudVal = $max;
// //         $preBudValPrev = $max;
// //     }

// //     $forexLoss = abs($max - $preBudVal);

// //     $chart = new Highchart();
// //     $chart -> includeExtraScripts();
// //     $chart -> chart = array(
// //         'renderTo'=> "canvas".$canvasId,
// //         'type' => 'gauge',
// //         'spacingTop' => 10,
// //         'spacingLeft' => 15,
// //         'width' => 398,
// //         'height' => 605
// //     );
// //     $chart -> title -> text= 'Date from: '.date('d/m/Y', strtotime($from)). ' to: '.date('d/m/Y', strtotime($date));
// //     $chart -> title -> style = array('color'=> '#666', 'fontWeight'=> 'normal', 'font'=> '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif');
// //     $chart -> title -> margin = 10;
// //     $chart -> title -> align = 'center';
// //     $chart -> legend -> enabled=true;
// //     $chart -> legend -> allowDecimals=false;
// //     $chart -> legend -> itemWidth=150;
// //     $chart -> legend -> itemStyle=array("cursor"=> 'default', "color"=> 'black', "fontWeight"=> 'bold', "font" => "8pt Trebuchet MS, Verdana, sans-serif");
// //     $chart -> legend -> align='left';
// //     $chart -> legend -> verticalAlign='top';
// //     $chart -> legend -> layout='vertical';
// //     $chart -> legend -> x=20;
// //     $chart -> legend -> y=460;
// //     $chart -> legend -> useHTML=true;
// //     $chart -> legend -> floating=true;
// //     $chart -> legend -> borderRadius=0;
// //     $chart -> legend -> borderWidth=0;
// //     $chart -> legend -> labelFormatter = new HighchartJsExpr("function () {
// //                         return this.yData + ' ".$txtSfx." ' + this.name;
// // } "
// //                   );

// // $chart -> pane -> startAngle = -150;
// // $chart -> pane -> endAngle = 150;
// // $chart -> pane -> center =[186, 260];
// // $chart -> background = array(
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#FFF'),
// //                 array(1, '#333')
// //             )
// //         ),
// //         'borderWidth' => 0,
// //         'outerRadius' => '100%'
// //     ),
// //     array(
// //         'backgroundColor' => array(
// //             'linearGradient' => array(
// //                 'x1' => 0,
// //                 'y1' => 0,
// //                 'x2' => 0,
// //                 'y2' => 1
// //             ),
// //             'stops' => array(
// //                 array(0, '#333'),
// //                 array(1, '#FFF')
// //             )
// //         ),
// //         'borderWidth' => 1,
// //         'outerRadius' => '107%'
// //     ),
// //     array(),
// //     array(
// //         'backgroundColor' => '#DDD',
// //         'borderWidth' => 0,
// //         'outerRadius' => '105%',
// //         'innerRadius' => '103%'
// //     )
// // );

// // $chart -> yAxis -> min=0;
// // $chart -> yAxis -> minorTickInterval= 'auto';
// // $chart -> yAxis -> minorTickWidth= 1;
// // $chart -> yAxis -> minorTickLength= 10;
// // $chart -> yAxis -> minorTickPosition= 'inside';
// // $chart -> yAxis -> minorTickColor= '#666';
// // $chart -> yAxis -> tickPixelInterval= 30;
// // $chart -> yAxis -> tickWidth= 2;
// // $chart -> yAxis -> tickPosition= 'inside';
// // $chart -> yAxis -> tickLength= 10;
// // $chart -> yAxis -> tickColor= '#666';
// // $chart -> yAxis -> labels= array("step"=> 3, "rotation"=> "auto");
// // $chart -> yAxis -> title -> text=$txt;
// // $chart -> yAxis -> title -> y=50;
// // $chart -> yAxis -> title -> style = array('color'=> 'blue', 'width'=> 30, 'fontWeight'=> 'normal', 'fontSize'=> '8px');


// // if ($max != 0 || $max != NULL) {
// //     $chart -> yAxis -> max=max($max, $net_generation, $forecast_generation, $preBudVal);
// //     $subtitleText = '<div><div><span style="background-color: #55BF3B;color:#000000;font-size:10px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($firstPlotBands, 1, '.', '').' - '.number_format($max, 1, '.', '').'</span>'.
// //                     '<span style="background-color: #ffbf00;color:#000000;font-size:10px; border-radius: 2px; padding: 1px 2px;">'.
// //         number_format($secPlotBands, 1, '.', '').' - '.number_format($firstPlotBands, 1, '.', '').'</span>'.
// //                         '<span style="background-color: #DF5353;color:#000000;font-size:10px; border-radius: 2px; padding: 1px 2px;">'.
// //                             '0 - '.number_format($secPlotBands, 1, '.', '').'</span></div>'.$info;



// //     if (!strstr($graphData -> graph_name, "INR") && strstr($graphData -> graph_name, "Revenue")) {
// //         $subtitleText.= '<div style="width:49%;float:left;text-align:right"><span style="color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">&nbsp;&nbsp;&nbsp;Current Budget '.number_format($max, 2, '.', '').' </span><br><span style="color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;">Forex Loss '.number_format($forexLoss, 2, '.', '').' </span></div></div';
// //     }

// //     $subtitleText.= '</div>';

// //     $chart -> subtitle -> text = $subtitleText;

// //     if ($net_generation >= $firstPlotBands) {
// //         $color = '#55BF3B';
// //     } elseif($net_generation < $firstPlotBands && $net_generation >= $secPlotBands){
// //         $color = '#ffbf00';
// //     }else {
// //         $color = '#DF5353';
// //     }


// //     $chart -> subtitle -> useHTML= true;
// //     $chart -> subtitle -> verticalAlign='top';
// //     $chart -> subtitle -> x=0;
// //     $chart -> subtitle -> y=50;
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#55BF3B', "from"=> $firstPlotBands, "to"=> max($max, $net_generation, $forecast_generation, $preBudVal));
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#ffbf00', "from"=> $secPlotBands, "to"=> $firstPlotBands);
// //     $chart -> yAxis -> plotBands[]=array("color"=> '#DF5353', "from"=> 0.0, "to"=> $secPlotBands);
// // }

// // $dataArray = ['1budget' => $preBudVal, '2qtd' => $actualBudgetVal, '3actual' => $net_generation, '4forecast' => $forecast_generation];
// // $baseWidth = $this -> hgm -> calculateDataMargin($dataArray, true);

// // $chart -> series[]=array("name"=> 'Budget',
// //     "showInLegend"=> true,
// //     "color"=> '#000000',
// //     "data"=> array(array("y"=>(float)$preBudVal, "color"=> '#000000')),
// //     "dial"=> array("backgroundColor"=> '#000000', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['1budget']),
// //     "dataLabels"=> array("enabled"=> false),
// //     'tooltip' => array(
// //         'valueSuffix' => $txtSfx
// //     ));

// // $chart -> series[]=array("name"=> 'YTD Budget',
// //     "showInLegend"=> true,
// //     "color"=> '#808080',
// //     "data"=> array(array("y"=>(float)$actualBudgetVal, "color"=> '#808080')),
// //     "dial"=> array("backgroundColor"=> '#808080', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['2qtd']),
// //     "dataLabels"=> array("enabled"=> false),
// //     'tooltip' => array(
// //         'valueSuffix' => $txtSfx
// //     ));

// // $chart -> series[]=array("name"=> 'Actual',
// //     "showInLegend"=> true,
// //     "color"=> '#4141FF',
// //     "data"=> array(array("y"=>(float)$net_generation, "color"=> '#4141FF')),
// //     "dial"=> array("backgroundColor"=> '#4141FF', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['3actual']),
// //     "dataLabels" => array(
// //         'formatter' => new HighchartJsExpr("function () {
// //                                              return '<span style=\"color:". $color ."\">".$net_generation." ".$dml."</span><br/>'; }"
// //                                          )),
// // 'tooltip' => array(
// //     'valueSuffix' => $txtSfx
// // ));

// // $chart -> series[]=array("name"=> 'Forecast',
// //     "showInLegend"=> true,
// //     "color"=> '#FFC200',
// //     "data"=> array(array("y"=>(float)$forecast_generation, "color"=> '#FFC200')),
// //     "dial"=> array("backgroundColor"=> '#FFC200', "radius"=> "85%", "rearLength"=> "0%", "baseWidth" => $baseWidth['4forecast']),
// //     "dataLabels"=> array("enabled"=> false),
// //     'tooltip' => array(
// //         'valueSuffix' => $txtSfx
// //     ));

// // $chart -> exporting -> buttons -> customButton -> x=-17;
// // $chart -> exporting -> buttons -> customButton -> y=-17;
// // $chart -> exporting -> buttons -> customButton -> align='right';
// // $chart -> exporting -> buttons -> customButton -> verticalAlign='top';
// // $chart -> exporting -> buttons -> customButton -> onclick=new HighchartJsExpr(
// //     "function() {
// //                                     window.open('iateExcelExportEXT/YTD', '_blank');}");
// // $chart -> exporting -> buttons -> customButton -> text= 'Dev <br/>Report';
// // echo $chart -> render("chart1");

// //   }

// }

// /**
//  * Adds time to a date. Modelled after MySQL DATE_ADD function.
//  * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
//  * 
//  * @param date  Date to start with
//  * @param interval  One of: year, quarter, month, week, day, hour, minute, second
//  * @param units  Number of units of the given interval to add.
//  */
// function dateAdd(date, interval, units) {
//     if (!(date instanceof Date))
//         return undefined;
//     var ret = new Date(date); //don't change original date
//     var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
//     switch (String(interval).toLowerCase()) {
//         case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
//         case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
//         case 'month': ret.setMonth(ret.getMonth() + units); checkRollover(); break;
//         case 'week': ret.setDate(ret.getDate() + 7 * units); break;
//         case 'day': ret.setDate(ret.getDate() + units); break;
//         case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
//         case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
//         case 'second': ret.setTime(ret.getTime() + units * 1000); break;
//         default: ret = undefined; break;
//     }
//     return ret;
// }

// function formatDate(date) {
//     var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2)
//         month = '0' + month;
//     if (day.length < 2)
//         day = '0' + day;

//     return [year, month, day].join('-');
// }
