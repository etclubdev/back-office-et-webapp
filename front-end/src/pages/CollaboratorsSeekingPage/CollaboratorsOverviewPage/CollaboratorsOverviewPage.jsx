import { useCallback, useEffect, useState } from "react";
import "./CollaboratorsOverviewPage.css";
import { PieChart, BarChart } from "@mui/x-charts";
import { getStatisticsData } from "../../../api/application.service";
import { getStatusOfFirstRecruitment, updateStatusOfRecruitment } from "../../../api/recruitment.service";
import {
  dataForPieChart,
  dataForBarChart,
} from "../../../utils/converDataForChart";
import { Header } from "../../../components/Header";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";
import { Switch } from '@mui/material';
import { getMaxValue } from "../../../utils/getMaxValue";
import { useAuth } from "../../../context/useAuth";

import { noDataForGraph } from "../../../assets/images/errors";
import { confirmContents } from '../../../constants';

const contents = confirmContents.recruitment;

export const CollaboratorsOverviewPage = () => {
  const { user } = useAuth();
  const isAdministator = user?.sysrole_name === 'Administrator';

  const [statisticsData, setStatisticsData] = useState({
    by_department: [],
    by_cohort: [],
    by_gender: [],
    totals: {
      total_applications: 0,
      total_members: 0,
    },
  });

  const [recruitment, setRecruitment] = useState({
    recruitment_id: "",
    is_open: false
  });

  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getStatisticsData();
      const recruitmentRes = await getStatusOfFirstRecruitment();

      setStatisticsData({
        ...data,
        by_major: dataForBarChart(
          "total_applications",
          "major",
          data.by_major || []
        ),
        by_department: dataForBarChart(
          "total_applications",
          "department",
          data.by_department || []
        ),
        by_cohort: dataForBarChart(
          "total_applications",
          "cohort_name",
          data.by_cohort || []
        ),
        by_gender: dataForPieChart(
          "by_gender",
          "total_applications",
          "gender",
          data.by_gender || []
        ),
      });
      setRecruitment(recruitmentRes.data);
    } catch (error) {
      console.error("Error fetching statistics data:", error);
    }
  }, [recruitment]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdateForm = () => {
    updateStatusOfRecruitment(recruitment.recruitment_id);
    setIsOpenConfirmDialog(false);
  }

  const handleContentOfDiaglog = useCallback(() => {
    if (recruitment.is_open) {
      return contents.closed;
    } else {
      return contents.opened;
    }
  }, [recruitment, contents])

  const contentOfDiaglog = useCallback(handleContentOfDiaglog(), [handleContentOfDiaglog])

  return (
    <div className="collaborators-overview-page">
      {isOpenConfirmDialog && (
        <ConfirmedDialog
          onClose={() => setIsOpenConfirmDialog(false)}
          onConfirm={handleUpdateForm}
          {...contentOfDiaglog}
        />
      )}

      <Header>Tổng quan</Header>
      <div className="collaborators-overview-section">
        <span style={{ width: "100%", height: "50px", opacity: 0 }}>_</span>
        <div className="cards-container">
          <div className="card form">
            <div className="title">
              <p>Tìm kiếm Cộng tác viên</p>
              <Switch
                onClick={() => { setIsOpenConfirmDialog(true) }}
                checked={recruitment.is_open}
                disabled={!isAdministator}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: '#fff',
                  },
                }}
              />
            </div>
            <p className="desc">Ẩn/ Hiển thị đơn đăng ký CTV</p>
          </div>
          <div className="card statistics">
            <div className="title">{statisticsData.totals.total_applications}</div>
            <p className="desc">Tổng đơn ứng tuyển</p>
          </div>
          <div className="card statistics">
            <div className="title">{statisticsData.totals.total_members}</div>
            <p className="desc">Tổng thành viên chính thức (từ CTV)</p>
          </div>
        </div>
        {/* Container 1 */}
        <div className="charts-container">
          <div className="chart-container" style={{ flex: 2.5 }}>
            <p className="title">ĐƠN ỨNG TUYỂN THEO BAN</p>
            {
              statisticsData.by_department?.length > 0 ? (
                <BarChart
                  dataset={statisticsData.by_department}
                  xAxis={[{ scaleType: "band", dataKey: "x" }]}
                  yAxis={[
                    {
                      colorMap: {
                        type: 'piecewise',
                        thresholds: getMaxValue(statisticsData.by_department),
                        colors: ['#0077B6', '#90E0EF'],
                      },
                    },
                  ]}
                  series={[{ dataKey: "y" }]}
                  height={300}
                />
              ) : (
                <div className="no-data">
                  <img src={noDataForGraph} alt="" />
                  <p>Not enough data to show a graph yet.</p>
                </div>
              )
            }
          </div>
          <div className="chart-container" style={{ flex: 1.5 }}>
            <p className="title">TỶ LỆ GIỚI TÍNH ỨNG VIÊN</p>
            {
              statisticsData.by_gender?.length > 0 ? (
                <PieChart
                  series={[{ data: statisticsData.by_gender }]}
                  height={300}
                  colors={['#0077B6', '#90E0EF']}
                />
              ) : (
                <div className="no-data">
                  <img src={noDataForGraph} alt="" />
                  <p>Not enough data to show a graph yet.</p>
                </div>
              )
            }
          </div>
        </div>

        {/* Container 2 */}
        <div className="charts-container">
          <div className="chart-container" style={{ flex: 1.5 }}>
            <p className="title">ĐƠN ỨNG TUYỂN THEO KHÓA</p>
            {statisticsData.by_cohort?.length > 0 ? (
              <BarChart
                dataset={statisticsData.by_cohort}
                xAxis={[{
                  scaleType: "band",
                  dataKey: "x",
                }]}
                yAxis={[{
                  colorMap: {
                    type: 'piecewise',
                    thresholds: getMaxValue(statisticsData.by_department),
                    colors: ['#0077B6', '#90E0EF'],
                  },
                },
                ]}
                series={[{ dataKey: "y" }]}
                height={300}
              />
            ) : (
                <div className="no-data">
                  <img src={noDataForGraph} alt="" />
                  <p>Not enough data to show a graph yet.</p>
                </div>
              )}
          </div>
          <div className="chart-container" style={{ flex: 2.5 }}>
            <p className="title">ĐƠN ỨNG TUYỂN THEO CHUYÊN NGÀNH</p>
            {statisticsData.by_major?.length > 0 ? (
              <BarChart
                dataset={statisticsData.by_major}
                yAxis={[
                  {
                    scaleType: "band",
                    dataKey: "x",
                  },
                ]}
                xAxis={[
                  {
                    colorMap: {
                      type: 'piecewise',
                      thresholds: getMaxValue(statisticsData.by_department),
                      colors: ['#0077B6', '#90E0EF'],
                    },
                  },
                ]}
                series={[{ dataKey: "y" }]}
                layout="horizontal"
                height={300}
              />
            ) : (
                <div className="no-data">
                  <img src={noDataForGraph} alt="" />
                  <p>Not enough data to show a graph yet.</p>
                </div>
              )}
          </div>
        </div>
        <span style={{ width: "100%", height: "50px", opacity: 0 }}>_</span>
      </div>
    </div>
  );
};
