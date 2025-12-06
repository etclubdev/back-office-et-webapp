import { useState } from "react";
import "./CollaboratorsOverviewPage.css";
import { PieChart, BarChart } from "@mui/x-charts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getStatisticsData } from "../../../api/application.service";
import { getStatusOfFirstRecruitment, updateStatusOfRecruitment } from "../../../api/recruitment.service";
import { dataForPieChart, dataForBarChart } from "../../../utils/converDataForChart";
import { Header } from "../../../components/Header";
import { ConfirmedDialog } from "../../../components/ConfirmedDialog";
import { Switch } from '@mui/material';
import { getMaxValue } from "../../../utils/getMaxValue";
import { useAuth } from "../../../context/useAuth";
import { CircularLoading } from '../../../components/CircularLoading';

import { noDataForGraph } from "../../../assets/images/errors";
import { confirmContents } from '../../../config/confirmContents';

// import { CircularProgress } from "@mui/material";

const contents = confirmContents.recruitment;

export const CollaboratorsOverviewPage = () => {
  const { user } = useAuth();
  const isAdministator = user?.sysrole_name === "Administrator";

  const queryClient = useQueryClient();
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Query: fetch statistics
  const { data: statisticsData, isLoading: statsLoading, isError: statsError } = useQuery({
    queryKey: ["statisticsData"],
    queryFn: async () => {
      // await delay(3000);
      const { data } = await getStatisticsData();
      return {
        ...data,
        by_major: dataForBarChart("total_applications", "major", data.by_major || []),
        by_department: dataForBarChart("total_applications", "department", data.by_department || []),
        by_cohort: dataForBarChart("total_applications", "cohort_name", data.by_cohort || []),
        by_gender: dataForPieChart("by_gender", "total_applications", "gender", data.by_gender || []),
      };
    },
    staleTime: 1000 * 60 * 3
  });


  // Query: fetch recruitment status
  const { data: recruitment } = useQuery({
    queryKey: ["recruitmentStatus"],
    queryFn: async () => {
      const res = await getStatusOfFirstRecruitment();
      return res.data;
    },
  });

  // Mutation: update recruitment status
  const updateRecruitmentMutation = useMutation({
    mutationFn: (id) => updateStatusOfRecruitment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruitmentStatus"] });
    },
  });

  // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const handleUpdateForm = async () => {
    if (!recruitment?.recruitment_id) return;

    try {
      setIsLoading(true);
      // await delay(3000);
      await updateRecruitmentMutation.mutateAsync(recruitment.recruitment_id);
      setIsOpenConfirmDialog(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const contentOfDiaglog = recruitment?.is_open ? contents.closed : contents.opened;

  if (statsError) return <p>Something went wrong when fetching data.</p>;

  return (
    <div className="collaborators-overview-page">
      {isOpenConfirmDialog && (
        <ConfirmedDialog
          onClose={() => setIsOpenConfirmDialog(false)}
          onConfirm={handleUpdateForm}
          {...contentOfDiaglog}
          isLoading={isLoading}
        />
      )}

      <Header>Tổng quan</Header>
      <div className="collaborators-overview-section">
        <span style={{ width: "100%", height: "50px", opacity: 0 }}>_</span>
        {
          statsLoading && <CircularLoading />
        }
        {/* Cards */}
        <div className="cards-container">
          <div className={`card form ${!recruitment?.is_open && "closed"}`}>
            <div className="title">
              <p>Tìm kiếm Cộng tác viên</p>
              <Switch
                onClick={() => setIsOpenConfirmDialog(true)}
                checked={recruitment?.is_open || false}
                disabled={!isAdministator}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#fff",
                  },
                }}
              />
            </div>
            <p className="desc">Ẩn/ Hiển thị đơn đăng ký CTV</p>
          </div>

          <div className="card statistics">
            <div className="title">{statisticsData?.totals.total_applications}</div>
            <p className="desc">Tổng đơn ứng tuyển</p>
          </div>
          <div className="card statistics">
            <div className="title">{statisticsData?.totals.total_members}</div>
            <p className="desc">Tổng thành viên chính thức (từ CTV)</p>
          </div>
        </div>

        {/* Container 1 */}
        <div className="charts-container">
          <div className="chart-container" style={{ flex: 2.5 }}>
            <p className="title">ĐƠN ỨNG TUYỂN THEO BAN</p>
            {statisticsData?.by_department?.length > 0 ? (
              <BarChart
                dataset={statisticsData.by_department}
                xAxis={[{ scaleType: "band", dataKey: "x" }]}
                yAxis={[
                  {
                    colorMap: {
                      type: "piecewise",
                      thresholds: getMaxValue(statisticsData.by_department),
                      colors: ["#0077B6", "#90E0EF"],
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

          <div className="chart-container" style={{ flex: 1.5 }}>
            <p className="title">TỶ LỆ GIỚI TÍNH ỨNG VIÊN</p>
            {statisticsData?.by_gender?.length > 0 ? (
              <PieChart
                series={[{ data: statisticsData.by_gender }]}
                height={300}
                colors={["#0077B6", "#90E0EF"]}
              />
            ) : (
              <div className="no-data">
                <img src={noDataForGraph} alt="" />
                <p>Not enough data to show a graph yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Container 2 */}
        <div className="charts-container">
          <div className="chart-container" style={{ flex: 1.5 }}>
            <p className="title">ĐƠN ỨNG TUYỂN THEO KHÓA</p>
            {statisticsData?.by_cohort?.length > 0 ? (
              <BarChart
                dataset={statisticsData.by_cohort}
                xAxis={[{ scaleType: "band", dataKey: "x" }]}
                yAxis={[
                  {
                    colorMap: {
                      type: "piecewise",
                      thresholds: getMaxValue(statisticsData.by_department),
                      colors: ["#0077B6", "#90E0EF"],
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
            {statisticsData?.by_major?.length > 0 ? (
              <BarChart
                dataset={statisticsData.by_major}
                yAxis={[{ scaleType: "band", dataKey: "x" }]}
                xAxis={[
                  {
                    colorMap: {
                      type: "piecewise",
                      thresholds: getMaxValue(statisticsData.by_department),
                      colors: ["#0077B6", "#90E0EF"],
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
